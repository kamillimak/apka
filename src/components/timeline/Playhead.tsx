import React, { useContext } from 'react';
import { PlaybackContext } from '../../context/PlaybackContext';

const PIXELS_PER_SECOND = 10;

const Playhead: React.FC = () => {
  const playbackContext = useContext(PlaybackContext);

  if (!playbackContext) {
    throw new Error('Playhead must be used within a PlaybackProvider');
  }

  const { currentTime } = playbackContext;

  return (
    <div
      className="absolute top-0 h-full w-0.5 bg-red-500 z-10"
      style={{
        left: `${currentTime * PIXELS_PER_SECOND}px`,
      }}
    />
  );
};

export default Playhead;
