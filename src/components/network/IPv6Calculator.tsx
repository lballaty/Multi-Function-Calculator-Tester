import React, { useState } from 'react';
import { isValidIPv6, expandIPv6 } from '../../utils/ipv6';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

export default function IPv6Calculator() {
  const [ipAddress, setIpAddress] = useState('');
  const [prefix, setPrefix] = useState('64');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    try {
      setError(null);
      if (!isValidIPv6(ipAddress)) {
        throw new Error('Invalid IPv6 address');
      }

      const expanded = expandIPv6(ipAddress);
      setResult({
        expanded,
        compressed: ipAddress,
        prefix
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation error');
      setResult(null);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">IPv6 Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EnhancedTooltipWrapper tooltip="Enter an IPv6 address">
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="IPv6 Address (e.g., 2001:db8::1)"
            className="w-full p-2 border rounded"
          />
        </EnhancedTooltipWrapper>

        <EnhancedTooltipWrapper tooltip="Enter prefix length">
          <input
            type="number"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            min="0"
            max="128"
            className="w-full p-2 border rounded"
            placeholder="Prefix Length (0-128)"
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
        <div className="p-4 bg-gray-50 rounded space-y-4">
          <div>
            <h3 className="font-medium mb-2">Address Formats</h3>
            <div className="space-y-1">
              <p>Compressed: {result.compressed}</p>
              <p className="break-all">Expanded: {result.expanded}</p>
              <p>CIDR Notation: {result.compressed}/{result.prefix}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}