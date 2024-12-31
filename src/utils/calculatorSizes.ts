import { CalculatorSize } from './themeTypes';

export const calculatorSizes: Record<string, CalculatorSize> = {
  small: {
    buttonPadding: 'p-1',
    buttonHeight: 'h-8',
    fontSize: 'text-xs',
    displayFontSize: 'text-xl',
    gap: 'gap-1',
  },
  medium: {
    buttonPadding: 'p-2',
    buttonHeight: 'h-10',
    fontSize: 'text-sm',
    displayFontSize: 'text-2xl',
    gap: 'gap-2',
  },
  large: {
    buttonPadding: 'p-3',
    buttonHeight: 'h-12',
    fontSize: 'text-base',
    displayFontSize: 'text-3xl',
    gap: 'gap-3',
  }
};

export const defaultSize = calculatorSizes.medium;