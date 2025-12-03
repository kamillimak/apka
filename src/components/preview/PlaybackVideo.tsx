import React, { useContext, useEffect, useRef } from 'react';
import { PlaybackContext } from '../../context/PlaybackContext';
import { ColorCorrectionContext } from '../../context/ColorCorrectionContext';

const PlaybackVideo: React.FC = () => {
  const playbackContext = useContext(PlaybackContext);
  const colorContext = useContext(ColorCorrectionContext);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!playbackContext || !colorContext) {
    throw new Error('PlaybackVideo must be used within a PlaybackProvider and ColorCorrectionProvider');
  }

  const { registerVideoElement, activeClip } = playbackContext;
  const { settings } = colorContext;
  
  const currentSettings = activeClip ? settings[activeClip.id] : null;

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

  const filterStyle = currentSettings
    ? `brightness(${currentSettings.brightness}%) contrast(${currentSettings.contrast}%) saturate(${currentSettings.saturate}%)`
    : 'none';

  return (
    <video 
      ref={videoRef} 
      className="w-full h-full object-contain" 
      controls={false}
      style={{ filter: filterStyle }}
    />
  );
};

export default PlaybackVideo;
