import { useSettings } from '../context/SettingsContext';
import { lightTheme, darkTheme } from '../utils/themeDefaults';

export function useThemeColors() {
  const { settings } = useSettings();
  const { theme, customColors } = settings;
  
  // Use system preference if theme is set to 'system'
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const baseTheme = theme === 'system' 
    ? (prefersDark ? darkTheme : lightTheme)
    : (theme === 'dark' ? darkTheme : lightTheme);

  // Merge custom colors with base theme
  return {
    ...baseTheme,
    ...customColors,
  };
}