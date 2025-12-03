import React, { createContext, useState, ReactNode } from 'react';
import { Clip, Transition } from '../types/types';

interface TimelineContextType {
  clips: Clip[];
  transitions: Transition[];
  addClip: (clip: Clip) => void;
  updateClipTimes: (id: string, startTime: number, endTime: number) => void;
  deleteClip: (id: string) => void;
  addTransition: (transition: Transition) => void;
}

export const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export const TimelineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clips, setClips] = useState<Clip[]>([]);
  const [transitions, setTransitions] = useState<Transition[]>([]);

  const addClip = (clip: Clip) => {
    setClips((prevClips) => [...prevClips, clip]);
  };

  const updateClipTimes = (id: string, startTime: number, endTime: number) => {
    setClips(prevClips =>
      prevClips.map(clip =>
        clip.id === id ? { ...clip, startTime, endTime } : clip
      )
    );
  };

  const deleteClip = (id: string) => {
    setClips(prevClips => prevClips.filter(clip => clip.id !== id));
  };

  const addTransition = (transition: Transition) => {
    setTransitions(prevTransitions => [...prevTransitions, transition]);
  };


  return (
    <TimelineContext.Provider value={{ clips, transitions, addClip, updateClipTimes, deleteClip, addTransition }}>
      {children}
    </TimelineContext.Provider>
  );
};
