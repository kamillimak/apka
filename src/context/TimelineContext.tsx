import React, { createContext, useState, ReactNode } from 'react';
import { Clip } from '../types/types';

interface TimelineContextType {
  clips: Clip[];
  addClip: (clip: Clip) => void;
}

export const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export const TimelineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clips, setClips] = useState<Clip[]>([]);

  const addClip = (clip: Clip) => {
    setClips((prevClips) => [...prevClips, clip]);
  };

  return (
    <TimelineContext.Provider value={{ clips, addClip }}>
      {children}
    </TimelineContext.Provider>
  );
};
