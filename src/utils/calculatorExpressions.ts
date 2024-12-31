import { formatNumber } from './numberFormat';

export const evaluateExpression = (expression: string): string => {
  try {
    // Replace mathematical operators with JavaScript operators
    const sanitizedExpression = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/\^/g, '**');

    // Evaluate the expression safely
    const result = Function(`'use strict'; return (${sanitizedExpression})`)();
    
    if (typeof result !== 'number' || !Number.isFinite(result)) {
      return 'Error';
    }

    return formatNumber(result);
  } catch (error) {
    return 'Error';
  }
};