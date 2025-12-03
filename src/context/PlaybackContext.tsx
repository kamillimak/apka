import React, { createContext, useState, ReactNode, useRef, useEffect, useContext } from 'react';
import { Clip } from '../types/types';
import { TimelineContext } from './TimelineContext'; // Import TimelineContext

interface PlaybackContextType {
  isPlaying: boolean;
  currentTime: number;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  registerVideoElement: (element: HTMLVideoElement | null) => void;
  activeClip: Clip | null;
}

export const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const PlaybackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const [activeClip, setActiveClip] = useState<Clip | null>(null);

  const timelineContext = useContext(TimelineContext); // Use TimelineContext
  const clips = timelineContext ? timelineContext.clips : []; // Get clips from TimelineContext

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const seek = (time: number) => {
    setCurrentTime(time);
    if (videoElementRef.current) {
      videoElementRef.current.currentTime = time;
    }
  };

  const registerVideoElement = (element: HTMLVideoElement | null) => {
    videoElementRef.current = element;
    if (element) {
      element.ontimeupdate = () => {
        setCurrentTime(element.currentTime);
      };
      element.onended = () => {
        const nextClipIndex = clips.findIndex(clip => clip.id === activeClip?.id) + 1;
        if (nextClipIndex < clips.length) {
          setActiveClip(clips[nextClipIndex]);
          setIsPlaying(true); // Auto-play next clip
        } else {
          setIsPlaying(false);
          setCurrentTime(0); // Reset after all clips
        }
      };
    }
  };

  useEffect(() => {
    if (clips.length > 0 && !activeClip) {
      setActiveClip(clips[0]);
    }
  }, [clips, activeClip]);

  useEffect(() => {
    if (videoElementRef.current) {
      if (isPlaying) {
        videoElementRef.current.play().catch(e => console.error("Error playing video:", e));
      } else {
        videoElementRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (activeClip && videoElementRef.current && videoElementRef.current.src !== activeClip.url) {
      videoElementRef.current.src = activeClip.url;
      videoElementRef.current.load();
      if (isPlaying) {
        videoElementRef.current.play().catch(e => console.error("Error playing video after source change:", e));
      }
    }
  }, [activeClip, isPlaying]);


  return (
    <PlaybackContext.Provider value={{ isPlaying, currentTime, play, pause, seek, registerVideoElement, activeClip }}>
      {children}
    </PlaybackContext.Provider>
  );
};
