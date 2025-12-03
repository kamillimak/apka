import React, { useContext, useEffect, useRef } from 'react';
import { TimelineContext } from '../../context/TimelineContext';
import { PlaybackContext } from '../../context/PlaybackContext';

const Preview: React.FC = () => {
  const timelineContext = useContext(TimelineContext);
  const playbackContext = useContext(PlaybackContext);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!timelineContext || !playbackContext) {
    throw new Error('Preview must be used within a TimelineProvider and PlaybackProvider');
  }

  const { clips } = timelineContext;
  const { isPlaying, currentTime, play, pause } = playbackContext;
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
  }, [currentTime]);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center">
      {firstVideo ? (
        <video ref={videoRef} className="w-full h-full" />
      ) : (
        <p className="text-gray-500">Video Preview</p>
      )}
      <div className="flex space-x-4 mt-4">
        <button onClick={play} className="bg-neon-green text-gray-900 font-bold py-2 px-4 rounded">Play</button>
        <button onClick={pause} className="bg-red-500 text-white font-bold py-2 px-4 rounded">Pause</button>
      </div>
    </div>
  );
};

export default Preview;
