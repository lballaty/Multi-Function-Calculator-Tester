import React from 'react';
import { useThemeColors } from '../hooks/useThemeColors';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colors = useThemeColors();
  
  // Create CSS variables for theme colors
  React.useEffect(() => {
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [colors]);

  return <>{children}</>;
}