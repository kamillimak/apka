import React, { useContext, useEffect } from 'react';
import { SelectionContext } from '../../context/SelectionContext';
import { ColorCorrectionContext } from '../../context/ColorCorrectionContext';

const Slider: React.FC<{
  label: string,
  value: number,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  min?: number,
  max?: number,
}> = ({ label, value, onChange, min = 0, max = 200 }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={label} className="text-sm font-medium">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          id={label}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className="w-full"
        />
        <span className="text-xs w-8">{value}%</span>
      </div>
    </div>
  );
};

const ColorCorrection: React.FC = () => {
  const selectionContext = useContext(SelectionContext);
  const colorContext = useContext(ColorCorrectionContext);

  if (!selectionContext || !colorContext) {
    throw new Error('ColorCorrection must be used within SelectionProvider and ColorCorrectionProvider');
  }

  const { selectedClipId } = selectionContext;
  const { settings, updateSettings } = colorContext;

  const currentSettings = selectedClipId ? settings[selectedClipId] || { brightness: 100, contrast: 100, saturate: 100 } : null;
  
  const handleChange = (property: 'brightness' | 'contrast' | 'saturate') => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedClipId) {
      updateSettings(selectedClipId, { [property]: parseInt(e.target.value, 10) });
    }
  };

  if (!selectedClipId || !currentSettings) {
    return null; // Don't render if no clip is selected
  }

  return (
    <div className="space-y-3 mt-4">
      <h3 className="text-lg font-semibold">Color Correction</h3>
      <Slider
        label="Brightness"
        value={currentSettings.brightness}
        onChange={handleChange('brightness')}
      />
      <Slider
        label="Contrast"
        value={currentSettings.contrast}
        onChange={handleChange('contrast')}
      />
      <Slider
        label="Saturation"
        value={currentSettings.saturate}
        onChange={handleChange('saturate')}
      />
    </div>
  );
};

export default ColorCorrection;
