import React, { createContext, useState, ReactNode } from 'react';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'video' | 'audio';
  duration: number;
}

interface MediaContextType {
  mediaFiles: MediaFile[];
  addMediaFile: (file: File) => void;
}

export const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);

  const addMediaFile = (file: File) => {
    const mediaElement = document.createElement(file.type.startsWith('video') ? 'video' : 'audio');
    mediaElement.src = URL.createObjectURL(file);
    mediaElement.onloadedmetadata = () => {
      const newMediaFile: MediaFile = {
        id: crypto.randomUUID(),
        name: file.name,
        url: mediaElement.src,
        type: file.type.startsWith('video') ? 'video' : 'audio',
        duration: mediaElement.duration,
      };
      setMediaFiles((prevFiles) => [...prevFiles, newMediaFile]);
    };
  };

  return (
    <MediaContext.Provider value={{ mediaFiles, addMediaFile }}>
      {children}
    </MediaContext.Provider>
  );
};
