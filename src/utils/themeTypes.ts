import { ThemeColors } from './themeTypes';

export interface ThemeColors {
  primary: string;    // Main buttons, active tabs
  secondary: string;  // Secondary buttons, inactive tabs
  accent: string;     // Highlights, focus states
  background: string; // Main app background
  card: string;       // Card/container background
  text: string;       // Main text color
  textSecondary: string; // Secondary text color
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface CalculatorSize {
  buttonPadding: string;
  buttonHeight: string;
  fontSize: string;
  displayFontSize: string;
  gap: string;
}

export interface ThemeSettings {
  mode: ThemeMode;
  colors: ThemeColors;
  calculatorSize: CalculatorSize;
}