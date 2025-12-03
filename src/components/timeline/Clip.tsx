import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';
import { Clip as ClipType } from '../../types/types';
import { SelectionContext } from '../../context/SelectionContext';
import { TimelineContext } from '../../context/TimelineContext';

const PIXELS_PER_SECOND = 10;
const HANDLE_WIDTH = 10;

const DraggableHandle: React.FC<{
  clip: ClipType,
  isLeft: boolean
}> = ({ clip, isLeft }) => {
  const timelineContext = useContext(TimelineContext);
  if (!timelineContext) throw new Error('DraggableHandle must be used within a TimelineProvider');
  const { updateClipTimes } = timelineContext;

  const [, drag] = useDrag({
    type: `handle-${isLeft ? 'left' : 'right'}-${clip.id}`,
    item: { id: clip.id, startTime: clip.startTime, endTime: clip.endTime },
    end: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const timeDelta = delta.x / PIXELS_PER_SECOND;
        if (isLeft) {
          updateClipTimes(clip.id, item.startTime + timeDelta, item.endTime);
        } else {
          updateClipTimes(clip.id, item.startTime, item.endTime + timeDelta);
        }
      }
    },
  });

  return (
    <div
      ref={drag}
      className={`absolute top-0 h-full w-[${HANDLE_WIDTH}px] bg-neon-green cursor-ew-resize z-20`}
      style={{
        [isLeft ? 'left' : 'right']: `-${HANDLE_WIDTH / 2}px`,
      }}
      onMouseDown={(e) => e.stopPropagation()} // Prevent clip drag
    />
  );
};


export const Clip: React.FC<{ clip: ClipType }> = ({ clip }) => {
  const selectionContext = useContext(SelectionContext);
  const timelineContext = useContext(TimelineContext);

  if (!selectionContext || !timelineContext) throw new Error('Clip must be used within a SelectionProvider and TimelineProvider');

  const { selectedClipId, selectClip } = selectionContext;
  const { updateClipTimes } = timelineContext;

  const isSelected = selectedClipId === clip.id;

  const [{ isDragging }, drag] = useDrag({
    type: 'clip',
    item: { id: clip.id, startTime: clip.startTime, endTime: clip.endTime, type: clip.type, name: clip.name, url: clip.url, duration: clip.duration },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const timeDelta = delta.x / PIXELS_PER_SECOND;
        const newStartTime = item.startTime + timeDelta;
        const newEndTime = item.endTime + timeDelta;
        updateClipTimes(item.id, newStartTime, newEndTime);
      }
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectClip(clip.id);
  };

  return (
    <div
      ref={drag}
      className={`absolute h-full bg-blue-500 border-2 z-10 ${isSelected ? 'border-neon-green' : 'border-blue-300'}`}
      style={{
        left: `${clip.startTime * PIXELS_PER_SECOND}px`,
        width: `${(clip.endTime - clip.startTime) * PIXELS_PER_SECOND}px`,
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={handleClick}
    >
      <p className="text-white text-xs p-1 truncate">{clip.name}</p>
      {isSelected && (
        <>
          <DraggableHandle clip={clip} isLeft={true} />
          <DraggableHandle clip={clip} isLeft={false} />
        </>
      )}
    </div>
  );
};
