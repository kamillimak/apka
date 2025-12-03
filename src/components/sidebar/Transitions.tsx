import React, { useContext } from 'react';
import { TimelineContext } from '../../context/TimelineContext';

const Transitions: React.FC = () => {
  const timelineContext = useContext(TimelineContext);

  if (!timelineContext) {
    throw new Error('Transitions must be used within a TimelineProvider');
  }

  const { clips, addTransition } = timelineContext;

  const handleAddCrossDissolve = () => {
    if (clips.length >= 2) {
      const firstClip = clips[0];
      const secondClip = clips[1];

      addTransition({
        id: crypto.randomUUID(),
        type: 'cross-dissolve',
        duration: 1, // 1 second
        fromClipId: firstClip.id,
        toClipId: secondClip.id,
      });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Transitions</h3>
      <button
        onClick={handleAddCrossDissolve}
        disabled={clips.length < 2}
        className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500"
      >
        Add Cross-Dissolve
      </button>
    </div>
  );
};

export default Transitions;
