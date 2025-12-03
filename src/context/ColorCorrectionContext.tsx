import React, { createContext, useState, ReactNode } from 'react';

export interface ColorCorrectionSettings {
  brightness: number;
  contrast: number;
  saturate: number;
}

export interface ClipColorCorrection {
  [clipId: string]: ColorCorrectionSettings;
}

interface ColorCorrectionContextType {
  settings: ClipColorCorrection;
  updateSettings: (clipId: string, newSettings: Partial<ColorCorrectionSettings>) => void;
}

export const ColorCorrectionContext = createContext<ColorCorrectionContextType | undefined>(undefined);

export const ColorCorrectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ClipColorCorrection>({});

  const updateSettings = (clipId: string, newSettings: Partial<ColorCorrectionSettings>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [clipId]: {
        ...prevSettings[clipId] || { brightness: 100, contrast: 100, saturate: 100 },
        ...newSettings,
      },
    }));
  };

  return (
    <ColorCorrectionContext.Provider value={{ settings, updateSettings }}>
      {children}
    </ColorCorrectionContext.Provider>
  );
};
