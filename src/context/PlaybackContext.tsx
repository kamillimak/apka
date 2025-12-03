import React, { createContext, useState, ReactNode, useRef, useEffect } from 'react';

interface PlaybackContextType {
  isPlaying: boolean;
  currentTime: number;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
}

export const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const PlaybackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const animationFrameRef = useRef<number>();

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const seek = (time: number) => setCurrentTime(time);

  useEffect(() => {
    const animate = () => {
      if (isPlaying) {
        setCurrentTime((prevTime) => prevTime + 1 / 60);
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <PlaybackContext.Provider value={{ isPlaying, currentTime, play, pause, seek }}>
      {children}
    </PlaybackContext.Provider>
  );
};
