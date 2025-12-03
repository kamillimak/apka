import React, { useContext } from 'react';
import { SelectionContext } from '../../context/SelectionContext';
import { TimelineContext } from '../../context/TimelineContext';
import { PlaybackContext } from '../../context/PlaybackContext';

const ClipActions: React.FC = () => {
  const selectionContext = useContext(SelectionContext);
  const timelineContext = useContext(TimelineContext);
  const playbackContext = useContext(PlaybackContext);

  if (!selectionContext || !timelineContext || !playbackContext) {
    throw new Error('ClipActions must be used within SelectionProvider, TimelineProvider, and PlaybackProvider');
  }

  const { selectedClipId } = selectionContext;
  const { deleteClip, addClip, clips } = timelineContext;
  const { currentTime } = playbackContext;

  const handleDelete = () => {
    if (selectedClipId) {
      deleteClip(selectedClipId);
    }
  };

  const handleSplit = () => {
    if (selectedClipId) {
      const clipToSplit = clips.find(c => c.id === selectedClipId);
      if (clipToSplit && currentTime > clipToSplit.startTime && currentTime < clipToSplit.endTime) {
        // Create the first part of the split clip
        const firstPart = { ...clipToSplit, endTime: currentTime };
        
        // Create the second part of the split clip
        const secondPart = { ...clipToSplit, id: crypto.randomUUID(), startTime: currentTime };

        // First delete the original clip
        deleteClip(selectedClipId);
        // Then add the two new clips
        addClip(firstPart);
        addClip(secondPart);
      }
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleSplit}
        disabled={!selectedClipId}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500"
      >
        Split
      </button>
      <button
        onClick={handleDelete}
        disabled={!selectedClipId}
        className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500"
      >
        Delete
      </button>
    </div>
  );
};

export default ClipActions;
