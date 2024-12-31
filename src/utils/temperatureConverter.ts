export const convertTemperature = (value: number, from: string, to: string): number => {
  // First convert to Celsius as base unit
  let celsius: number;
  
  switch (from) {
    case 'fahrenheit':
      celsius = (value - 32) * (5/9);
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
    default: // celsius
      celsius = value;
  }

  // Then convert from Celsius to target unit
  switch (to) {
    case 'fahrenheit':
      return (celsius * 9/5) + 32;
    case 'kelvin':
      return celsius + 273.15;
    default: // celsius
      return celsius;
  }
};