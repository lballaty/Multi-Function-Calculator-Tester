import { CalculatorState, CalculatorAction } from './calculatorTypes';
import { evaluateExpression } from './calculatorExpressions';
import * as progOps from './programmerCalculations';

export const initialState: CalculatorState = {
  display: '0',
  equation: '',
  isNewNumber: true,
  operator: null,
  previousValue: null,
};

export function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'NUMBER':
      return {
        ...state,
        display: state.isNewNumber ? action.payload! : state.display + action.payload!,
        isNewNumber: false,
      };
      
    case 'OPERATOR':
      return {
        ...state,
        operator: action.payload!,
        previousValue: state.display,
        equation: `${state.display} ${action.payload}`,
        isNewNumber: true,
      };
      
    case 'CALCULATE':
      if (!state.equation || !state.previousValue) return state;
      
      const expression = state.equation + ' ' + state.display;
      let result;
      
      // Handle programmer operations
      if (expression.includes('&')) {
        result = progOps.bitwiseAND(state.previousValue, state.display);
      } else if (expression.includes('|')) {
        result = progOps.bitwiseOR(state.previousValue, state.display);
      } else if (expression.includes('^')) {
        result = progOps.bitwiseXOR(state.previousValue, state.display);
      } else if (expression.includes('<<')) {
        result = progOps.leftShift(state.previousValue, state.display);
      } else if (expression.includes('>>')) {
        result = progOps.rightShift(state.previousValue, state.display);
      } else if (expression.includes('%')) {
        result = progOps.mod(state.previousValue, state.display);
      } else if (expression.includes('\\')) {
        result = progOps.intDiv(state.previousValue, state.display);
      } else {
        result = evaluateExpression(expression);
      }

      return {
        ...state,
        display: result,
        equation: '',
        isNewNumber: true,
        operator: null,
        previousValue: null,
      };
      
    case 'CLEAR':
      return initialState;
      
    case 'CLEAR_ENTRY':
      return {
        ...state,
        display: '0',
        isNewNumber: true,
      };
      
    default:
      return state;
  }
}