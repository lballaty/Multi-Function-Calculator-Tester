import { formatNumber } from './numberFormat';

// Basic Operations
export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;
export const multiply = (a: number, b: number): number => a * b;
export const divide = (a: number, b: number): number => b !== 0 ? a / b : NaN;

// Scientific Operations
export const calculatePower = (base: string, exponent: string): string => {
  try {
    const result = Math.pow(parseFloat(base), parseFloat(exponent));
    return formatNumber(result);
  } catch (error) {
    return 'Error';
  }
};

export const calculateSquareRoot = (value: string): string => {
  try {
    const num = parseFloat(value);
    if (num < 0) return 'Error';
    return formatNumber(Math.sqrt(num));
  } catch (error) {
    return 'Error';
  }
};

export const calculateInverse = (value: string): string => {
  try {
    const num = parseFloat(value);
    if (num === 0) return 'Error';
    return formatNumber(1 / num);
  } catch (error) {
    return 'Error';
  }
};

export const calculateFactorial = (value: string): string => {
  try {
    const num = parseInt(value);
    if (num < 0 || !Number.isInteger(num)) return 'Error';
    let result = 1;
    for (let i = 2; i <= num; i++) result *= i;
    return formatNumber(result);
  } catch (error) {
    return 'Error';
  }
};

// Trigonometric Operations
export const calculateSin = (value: string, isDegrees: boolean = true): string => {
  try {
    let num = parseFloat(value);
    if (isDegrees) num = (num * Math.PI) / 180;
    return formatNumber(Math.sin(num));
  } catch (error) {
    return 'Error';
  }
};

export const calculateCos = (value: string, isDegrees: boolean = true): string => {
  try {
    let num = parseFloat(value);
    if (isDegrees) num = (num * Math.PI) / 180;
    return formatNumber(Math.cos(num));
  } catch (error) {
    return 'Error';
  }
};

export const calculateTan = (value: string, isDegrees: boolean = true): string => {
  try {
    let num = parseFloat(value);
    if (isDegrees) num = (num * Math.PI) / 180;
    return formatNumber(Math.tan(num));
  } catch (error) {
    return 'Error';
  }
};

// Logarithmic Operations
export const calculateLog = (value: string): string => {
  try {
    const num = parseFloat(value);
    if (num <= 0) return 'Error';
    return formatNumber(Math.log10(num));
  } catch (error) {
    return 'Error';
  }
};

export const calculateLn = (value: string): string => {
  try {
    const num = parseFloat(value);
    if (num <= 0) return 'Error';
    return formatNumber(Math.log(num));
  } catch (error) {
    return 'Error';
  }
};

// Percentage Operations
export const calculatePercentage = (value: string): string => {
  try {
    return formatNumber(parseFloat(value) / 100);
  } catch (error) {
    return 'Error';
  }
};