export const isValidIPv6 = (ip: string): boolean => {
  const parts = ip.split(':');
  if (parts.length > 8) return false;
  
  // Handle :: abbreviation
  if (ip.includes('::')) {
    if (ip.match(/::/g)?.length! > 1) return false;
    const missingCount = 8 - parts.filter(p => p !== '').length;
    if (missingCount < 0) return false;
  }
  
  return parts.every(part => {
    if (part === '') return true;
    return /^[0-9A-Fa-f]{1,4}$/.test(part);
  });
};

export const expandIPv6 = (ip: string): string => {
  if (ip.includes('::')) {
    const parts = ip.split('::');
    const left = parts[0] ? parts[0].split(':') : [];
    const right = parts[1] ? parts[1].split(':') : [];
    const missing = 8 - (left.length + right.length);
    const middle = Array(missing).fill('0000');
    const full = [...left, ...middle, ...right];
    return full.map(part => part.padStart(4, '0')).join(':');
  }
  
  return ip.split(':')
    .map(part => part.padStart(4, '0'))
    .join(':');
};