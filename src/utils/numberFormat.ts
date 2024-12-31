const MAX_DECIMAL_PLACES = 10;

export const formatNumber = (value: number): string => {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return 'Error';
  }

  const absValue = Math.abs(value);
  
  // Use scientific notation for very large or very small numbers
  if (absValue >= 1e10 || (absValue < 1e-7 && absValue > 0)) {
    return value.toExponential(MAX_DECIMAL_PLACES - 1);
  }
  
  // For regular numbers, limit decimal places
  const formatted = value.toFixed(MAX_DECIMAL_PLACES);
  // Remove trailing zeros after decimal point
  return formatted.replace(/\.?0+$/, '');
};