import React, { useContext } from 'react';
import { SubtitlesContext } from '../../context/SubtitlesContext';
import { Subtitle as SubtitleType } from '../../context/SubtitlesContext';

const PIXELS_PER_SECOND = 10;

const Subtitle: React.FC<{ subtitle: SubtitleType }> = ({ subtitle }) => {
  return (
    <div
      className="absolute h-8 bg-purple-500 border border-purple-300"
      style={{
        left: `${subtitle.startTime * PIXELS_PER_SECOND}px`,
        width: `${(subtitle.endTime - subtitle.startTime) * PIXELS_PER_SECOND}px`,
      }}
    >
      <p className="text-white text-xs p-1 truncate">{subtitle.text}</p>
    </div>
  );
};

const SubtitlesTrack: React.FC = () => {
  const subtitlesContext = useContext(SubtitlesContext);

  if (!subtitlesContext) {
    throw new Error('SubtitlesTrack must be used within a SubtitlesProvider');
  }

  const { subtitles } = subtitlesContext;

  return (
    <div className="relative h-12 bg-gray-700 my-2">
      {subtitles.map(subtitle => (
        <Subtitle key={subtitle.id} subtitle={subtitle} />
      ))}
    </div>
  );
};

export default SubtitlesTrack;
