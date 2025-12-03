import React, { useContext, useState } from 'react';
import { SubtitlesContext, Subtitle } from '../../context/SubtitlesContext';
import { PlaybackContext } from '../../context/PlaybackContext';
import PlaybackVideo from './PlaybackVideo';

const Preview: React.FC = () => {
  const playbackContext = useContext(PlaybackContext);
  const subtitlesContext = useContext(SubtitlesContext);
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | null>(null);

  if (!playbackContext || !subtitlesContext) {
    throw new Error('Preview must be used within a PlaybackProvider and SubtitlesProvider');
  }

  const { currentTime, play, pause, activeClip } = playbackContext;
  const { subtitles } = subtitlesContext;

  React.useEffect(() => {
    const activeSubtitle = subtitles.find(sub => currentTime >= sub.startTime && currentTime <= sub.endTime);
    setCurrentSubtitle(activeSubtitle || null);
  }, [currentTime, subtitles]);


  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative">
      {activeClip ? (
        <PlaybackVideo />
      ) : (
        <p className="text-gray-500">Video Preview</p>
      )}
      {currentSubtitle && (
        <div className="absolute bottom-10 bg-black bg-opacity-50 p-2 rounded">
          <p className="text-white text-2xl font-bold text-center">{currentSubtitle.text}</p>
        </div>
      )}
      <div className="absolute bottom-0 flex space-x-4 p-4">
        <button onClick={play} className="bg-neon-green text-gray-900 font-bold py-2 px-4 rounded">Play</button>
        <button onClick={pause} className="bg-red-500 text-white font-bold py-2 px-4 rounded">Pause</button>
      </div>
    </div>
  );
};

export default Preview;
