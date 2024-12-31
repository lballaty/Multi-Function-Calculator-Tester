import React, { useState } from 'react';
import { isValidIPv4, calculateSubnet } from '../../utils/ipv4';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

export default function IPCalculator() {
  const [ipAddress, setIpAddress] = useState('');
  const [prefix, setPrefix] = useState('24');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    try {
      setError(null);
      if (!isValidIPv4(ipAddress)) {
        throw new Error('Invalid IP address');
      }
      
      const subnet = calculateSubnet(`${ipAddress}/${prefix}`);
      setResult(subnet);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation error');
      setResult(null);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">IP Address Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EnhancedTooltipWrapper tooltip="Enter an IPv4 address">
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="IP Address (e.g., 192.168.1.1)"
            className="w-full p-2 border rounded"
          />
        </EnhancedTooltipWrapper>

        <EnhancedTooltipWrapper tooltip="Enter subnet prefix length (CIDR notation)">
          <input
            type="number"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            min="0"
            max="32"
            className="w-full p-2 border rounded"
            placeholder="Prefix Length (0-32)"
          />
        </EnhancedTooltipWrapper>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
          <div>
            <h3 className="font-medium mb-2">Network Information</h3>
            <div className="space-y-1">
              <p>Network Address: {result.networkAddress}</p>
              <p>Broadcast Address: {result.broadcastAddress}</p>
              <p>Subnet Mask: {result.subnetMask}</p>
              <p>CIDR Notation: {ipAddress}/{prefix}</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Host Range</h3>
            <div className="space-y-1">
              <p>First Host: {result.firstHost}</p>
              <p>Last Host: {result.lastHost}</p>
              <p>Total Hosts: {result.availableNodes}</p>
              <p>Usable Hosts: {result.availableNodes - 2}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}