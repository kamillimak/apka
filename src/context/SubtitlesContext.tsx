import React, { createContext, useState, ReactNode } from 'react';

export interface Subtitle {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
}

interface SubtitlesContextType {
  subtitles: Subtitle[];
  addSubtitles: (subtitles: Subtitle[]) => void;
}

export const SubtitlesContext = createContext<SubtitlesContextType | undefined>(undefined);

export const SubtitlesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);

  const addSubtitles = (newSubtitles: Subtitle[]) => {
    setSubtitles(newSubtitles);
  };

  return (
    <SubtitlesContext.Provider value={{ subtitles, addSubtitles }}>
      {children}
    </SubtitlesContext.Provider>
  );
};
