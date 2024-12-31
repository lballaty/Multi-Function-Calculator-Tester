import { formatNumber } from './numberFormat';

// Binary Operations
export const toBinary = (value: string): string => {
  try {
    const num = parseInt(value);
    return num.toString(2);
  } catch {
    return 'Error';
  }
};

export const toHex = (value: string): string => {
  try {
    const num = parseInt(value);
    return num.toString(16).toUpperCase();
  } catch {
    return 'Error';
  }
};

export const toOctal = (value: string): string => {
  try {
    const num = parseInt(value);
    return num.toString(8);
  } catch {
    return 'Error';
  }
};

// Bitwise Operations
export const bitwiseAND = (a: string, b: string): string => {
  try {
    return formatNumber(parseInt(a) & parseInt(b));
  } catch {
    return 'Error';
  }
};

export const bitwiseOR = (a: string, b: string): string => {
  try {
    return formatNumber(parseInt(a) | parseInt(b));
  } catch {
    return 'Error';
  }
};

export const bitwiseXOR = (a: string, b: string): string => {
  try {
    return formatNumber(parseInt(a) ^ parseInt(b));
  } catch {
    return 'Error';
  }
};

export const bitwiseNOT = (value: string): string => {
  try {
    return formatNumber(~parseInt(value));
  } catch {
    return 'Error';
  }
};

export const leftShift = (value: string, bits: string): string => {
  try {
    return formatNumber(parseInt(value) << parseInt(bits));
  } catch {
    return 'Error';
  }
};

export const rightShift = (value: string, bits: string): string => {
  try {
    return formatNumber(parseInt(value) >> parseInt(bits));
  } catch {
    return 'Error';
  }
};

// Common Programming Operations
export const mod = (a: string, b: string): string => {
  try {
    const result = parseInt(a) % parseInt(b);
    return formatNumber(result);
  } catch {
    return 'Error';
  }
};

export const intDiv = (a: string, b: string): string => {
  try {
    const result = Math.floor(parseInt(a) / parseInt(b));
    return formatNumber(result);
  } catch {
    return 'Error';
  }
};