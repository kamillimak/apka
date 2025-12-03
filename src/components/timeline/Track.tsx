import React, { useContext, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes, Clip as ClipType } from '../../types/types';
import { TimelineContext } from '../../context/TimelineContext';
import { Clip } from './Clip';

const PIXELS_PER_SECOND = 10;

const Track: React.FC = () => {
  const timelineContext = useContext(TimelineContext);
  const trackRef = useRef<HTMLDivElement>(null);

  if (!timelineContext) {
    throw new Error('Track must be used within a TimelineProvider');
  }

  const { clips, addClip } = timelineContext;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CLIP,
    drop: (item: ClipType, monitor) => {
      const trackRect = trackRef.current?.getBoundingClientRect();
      if (trackRect) {
        const dropX = monitor.getClientOffset()?.x || 0;
        const startTime = (dropX - trackRect.left) / PIXELS_PER_SECOND;
        const endTime = startTime + item.duration;

        addClip({
          ...item,
          startTime,
          endTime,
        });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`relative h-24 bg-gray-700 my-2 ${isOver ? 'bg-gray-600' : ''}`}
    >
      <div ref={trackRef} className="relative w-full h-full">
        {clips.map(clip => (
          <Clip key={clip.id} clip={clip} />
        ))}
      </div>
    </div>
  );
};

export default Track;
