import { ConversionMap } from './conversionTypes';

export const convert = (
  value: string,
  fromUnit: string,
  toUnit: string,
  category: string,
  conversionMap: ConversionMap
): string => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return '0';

  const categoryUnits = conversionMap[category];
  if (!categoryUnits) return '0';

  const fromFactor = categoryUnits[fromUnit];
  const toFactor = categoryUnits[toUnit];
  if (!fromFactor || !toFactor) return '0';

  const baseValue = numValue / fromFactor;
  const result = baseValue * toFactor;
  
  return result.toFixed(4);
};