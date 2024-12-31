import React, { createContext, useContext, useState } from 'react';
import { ThemeSettings, ThemeColors, CalculatorSize } from '../utils/themeTypes';
import { lightTheme } from '../utils/themeDefaults';
import { defaultSize } from '../utils/calculatorSizes';

interface Settings {
  tooltipsEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
  customColors: Partial<ThemeColors>;
  calculatorSize: CalculatorSize;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  updateCustomColors: (colors: Partial<ThemeColors>) => void;
  updateCalculatorSize: (size: CalculatorSize) => void;
}

const defaultSettings: Settings = {
  tooltipsEnabled: false, // Changed to false by default
  theme: 'light',
  customColors: {},
  calculatorSize: defaultSize,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateCustomColors = (colors: Partial<ThemeColors>) => {
    setSettings(prev => ({
      ...prev,
      customColors: { ...prev.customColors, ...colors },
    }));
  };

  const updateCalculatorSize = (size: CalculatorSize) => {
    setSettings(prev => ({
      ...prev,
      calculatorSize: size,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, updateCustomColors, updateCalculatorSize }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}