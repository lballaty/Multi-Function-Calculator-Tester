export const isValidIPv4 = (ip: string): boolean => {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  
  return parts.every(part => {
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255 && part === num.toString();
  });
};

export const isValidCIDR = (cidr: string): boolean => {
  const [ip, prefix] = cidr.split('/');
  if (!isValidIPv4(ip)) return false;
  
  const prefixNum = parseInt(prefix, 10);
  return prefixNum >= 0 && prefixNum <= 32;
};

export const calculateRequiredSubnet = (baseIP: string, requiredNodes: number): string => {
  // Calculate required bits for hosts
  const hostBits = Math.ceil(Math.log2(requiredNodes + 2)); // +2 for network and broadcast addresses
  const prefix = 32 - hostBits;
  
  // Ensure prefix is valid (between 0 and 32)
  if (prefix < 0 || prefix > 32) {
    throw new Error('Invalid number of required nodes');
  }
  
  return `${baseIP}/${prefix}`;
};

export const calculateSubnet = (cidr: string): {
  networkAddress: string;
  broadcastAddress: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  subnetMask: string;
  availableNodes: number;
} => {
  const [ip, prefix] = cidr.split('/');
  const prefixNum = parseInt(prefix, 10);
  
  // Convert IP to binary
  const ipBinary = ip.split('.')
    .map(num => parseInt(num, 10).toString(2).padStart(8, '0'))
    .join('');
  
  // Calculate subnet mask
  const maskBinary = '1'.repeat(prefixNum).padEnd(32, '0');
  const networkBinary = ipBinary.slice(0, prefixNum).padEnd(32, '0');
  const broadcastBinary = ipBinary.slice(0, prefixNum).padEnd(32, '1');
  
  // Convert binary to dotted decimal
  const toBinary = (binary: string): string => {
    return binary.match(/.{8}/g)!
      .map(oct => parseInt(oct, 2).toString())
      .join('.');
  };
  
  const networkAddress = toBinary(networkBinary);
  const broadcastAddress = toBinary(broadcastBinary);
  const subnetMask = toBinary(maskBinary);
  const availableNodes = Math.pow(2, 32 - prefixNum) - 2;
  
  // Calculate first and last host
  const firstHostBinary = networkBinary.slice(0, -1) + '1';
  const lastHostBinary = broadcastBinary.slice(0, -1) + '0';
  
  return {
    networkAddress,
    broadcastAddress,
    firstHost: toBinary(firstHostBinary),
    lastHost: toBinary(lastHostBinary),
    totalHosts: availableNodes,
    subnetMask,
    availableNodes
  };
};