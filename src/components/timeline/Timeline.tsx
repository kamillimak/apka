import React from 'react';
import Track from './Track';
import Playhead from './Playhead';
import SubtitlesTrack from './SubtitlesTrack';

const Timeline: React.FC = () => {
  return (
    <div className="w-full h-full p-4 overflow-x-auto">
      <h2 className="text-xl font-bold text-neon-green mb-4">Timeline</h2>
      <div className="relative">
        <Playhead />
        <Track />
        <SubtitlesTrack />
      </div>
    </div>
  );
};

export default Timeline;
