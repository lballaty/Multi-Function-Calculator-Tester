export interface CalculatorState {
  display: string;
  equation: string;
  isNewNumber: boolean;
  operator: string | null;
  previousValue: string | null;
}

export interface CalculatorAction {
  type: 'NUMBER' | 'OPERATOR' | 'CALCULATE' | 'CLEAR' | 'CLEAR_ENTRY' | 'MEMORY';
  payload?: string;
}

export type CalculatorMode = 'standard' | 'programmer';