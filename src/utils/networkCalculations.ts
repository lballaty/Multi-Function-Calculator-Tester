// Bandwidth calculations
export const calculateBandwidth = (size: number, time: number, unit: string): number => {
  const multipliers = {
    'bps': 1,
    'Kbps': 1000,
    'Mbps': 1000000,
    'Gbps': 1000000000,
  };
  return (size / time) * (multipliers[unit as keyof typeof multipliers] || 1);
};

// Download/Upload time calculations
export const calculateTransferTime = (
  fileSize: number, 
  bandwidth: number, 
  fileSizeUnit: string,
  bandwidthUnit: string
): number => {
  const fileSizeMultipliers = {
    'B': 1,
    'KB': 1024,
    'MB': 1048576,
    'GB': 1073741824,
  };
  
  const bandwidthMultipliers = {
    'bps': 1,
    'Kbps': 1000,
    'Mbps': 1000000,
    'Gbps': 1000000000,
  };

  const sizeInBits = (fileSize * (fileSizeMultipliers[fileSizeUnit as keyof typeof fileSizeMultipliers] || 1)) * 8;
  const bandwidthInBps = bandwidth * (bandwidthMultipliers[bandwidthUnit as keyof typeof bandwidthMultipliers] || 1);
  
  return sizeInBits / bandwidthInBps;
};

// Data unit conversions
export const convertDataUnits = (value: number, fromUnit: string, toUnit: string): number => {
  const units = {
    'b': 1,
    'B': 8,
    'Kb': 1000,
    'KB': 8 * 1024,
    'Mb': 1000000,
    'MB': 8 * 1048576,
    'Gb': 1000000000,
    'GB': 8 * 1073741824,
  };

  const fromValue = units[fromUnit as keyof typeof units] || 1;
  const toValue = units[toUnit as keyof typeof units] || 1;
  
  return (value * fromValue) / toValue;
};