import React from 'react';
import { Clip as ClipType } from '../../types/types';

const PIXELS_PER_SECOND = 10;

interface ClipProps {
  clip: ClipType;
}

export const Clip: React.FC<ClipProps> = ({ clip }) => {
  return (
    <div
      className="absolute h-full bg-blue-500 border border-blue-300"
      style={{
        left: `${clip.startTime * PIXELS_PER_SECOND}px`,
        width: `${(clip.endTime - clip.startTime) * PIXELS_PER_SECOND}px`,
      }}
    >
      <p className="text-white text-xs p-1 truncate">{clip.name}</p>
    </div>
  );
};
