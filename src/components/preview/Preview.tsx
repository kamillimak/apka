import React, { useContext, useEffect, useRef, useState } from 'react';
import { TimelineContext } from '../../context/TimelineContext';
import { PlaybackContext } from '../../context/PlaybackContext';
import { SubtitlesContext, Subtitle } from '../../context/SubtitlesContext';

const Preview: React.FC = () => {
  const timelineContext = useContext(TimelineContext);
  const playbackContext = useContext(PlaybackContext);
  const subtitlesContext = useContext(SubtitlesContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | null>(null);

  if (!timelineContext || !playbackContext || !subtitlesContext) {
    throw new Error('Preview must be used within a TimelineProvider, PlaybackProvider, and SubtitlesProvider');
  }

  const { clips } = timelineContext;
  const { isPlaying, currentTime, play, pause } = playbackContext;
  const { subtitles } = subtitlesContext;
  const firstVideo = clips.find(clip => clip.type === 'video');

  useEffect(() => {
    if (firstVideo && videoRef.current) {
      videoRef.current.src = firstVideo.url;
    }
  }, [firstVideo]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  useEffect(() => {
    if (videoRef.current && Math.abs(videoRef.current.currentTime - currentTime) > 0.1) {
      videoRef.current.currentTime = currentTime;
    }

    const activeSubtitle = subtitles.find(sub => currentTime >= sub.startTime && currentTime <= sub.endTime);
    setCurrentSubtitle(activeSubtitle || null);

  }, [currentTime, subtitles]);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative">
      {firstVideo ? (
        <video ref={videoRef} className="w-full h-full" />
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
