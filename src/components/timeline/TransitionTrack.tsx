import React, { useContext } from 'react';
import { TimelineContext } from '../../context/TimelineContext';

const PIXELS_PER_SECOND = 10;

const TransitionTrack: React.FC = () => {
  const timelineContext = useContext(TimelineContext);

  if (!timelineContext) {
    throw new Error('TransitionTrack must be used within a TimelineProvider');
  }

  const { clips, transitions } = timelineContext;

  return (
    <div className="relative h-8">
      {transitions.map(transition => {
        const fromClip = clips.find(c => c.id === transition.fromClipId);
        if (!fromClip) return null;

        const left = fromClip.endTime * PIXELS_PER_SECOND - (transition.duration * PIXELS_PER_SECOND) / 2;
        const width = transition.duration * PIXELS_PER_SECOND;

        return (
          <div
            key={transition.id}
            className="absolute h-full bg-yellow-500 border border-yellow-300"
            style={{
              left: `${left}px`,
              width: `${width}px`,
            }}
          >
            <p className="text-white text-xs p-1 truncate">{transition.type}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TransitionTrack;
