import React, { useContext, useEffect, useRef } from 'react';
import { PlaybackContext } from '../../context/PlaybackContext';

const PlaybackVideo: React.FC = () => {
  const playbackContext = useContext(PlaybackContext);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!playbackContext) {
    throw new Error('PlaybackVideo must be used within a PlaybackProvider');
  }

  const { registerVideoElement, activeClip } = playbackContext;

  useEffect(() => {
    registerVideoElement(videoRef.current);
    return () => registerVideoElement(null);
  }, [registerVideoElement]);

  useEffect(() => {
    if (activeClip && videoRef.current) {
      if (videoRef.current.src !== activeClip.url) {
        videoRef.current.src = activeClip.url;
        videoRef.current.load();
      }
    }
  }, [activeClip]);

  return (
    <video ref={videoRef} className="w-full h-full object-contain" controls={false} />
  );
};

export default PlaybackVideo;
