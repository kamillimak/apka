import React, { createContext, useState, ReactNode } from 'react';

interface SelectionContextType {
  selectedClipId: string | null;
  selectClip: (id: string | null) => void;
}

export const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedClipId, setSelectedClipId] = useState<string | null>(null);

  const selectClip = (id: string | null) => {
    setSelectedClipId(id);
  };

  return (
    <SelectionContext.Provider value={{ selectedClipId, selectClip }}>
      {children}
    </SelectionContext.Provider>
  );
};
