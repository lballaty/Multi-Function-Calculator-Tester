import React, { useState } from 'react';
import { isValidIPv4, calculateRequiredSubnet, calculateSubnet } from '../../utils/ipv4';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

export default function SubnetCalculator() {
  const [ipAddress, setIpAddress] = useState('');
  const [requiredHosts, setRequiredHosts] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    try {
      setError(null);
      if (!isValidIPv4(ipAddress)) {
        throw new Error('Invalid IP address');
      }

      const hosts = parseInt(requiredHosts);
      if (isNaN(hosts) || hosts < 1) {
        throw new Error('Invalid number of required hosts');
      }

      const cidr = calculateRequiredSubnet(ipAddress, hosts);
      const subnet = calculateSubnet(cidr);
      setResult({ ...subnet, cidr });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation error');
      setResult(null);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Subnet Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EnhancedTooltipWrapper tooltip="Enter the network address">
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="Network Address (e.g., 192.168.0.0)"
            className="w-full p-2 border rounded"
          />
        </EnhancedTooltipWrapper>

        <EnhancedTooltipWrapper tooltip="Enter the number of required hosts">
          <input
            type="number"
            value={requiredHosts}
            onChange={(e) => setRequiredHosts(e.target.value)}
            min="1"
            placeholder="Required Hosts"
            className="w-full p-2 border rounded"
          />
        </EnhancedTooltipWrapper>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Calculate Subnet
      </button>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4 p-4 bg-gray-50 rounded">
          <div>
            <h3 className="font-medium mb-2">Subnet Information</h3>
            <div className="space-y-1">
              <p>CIDR Notation: {result.cidr}</p>
              <p>Subnet Mask: {result.subnetMask}</p>
              <p>Network Address: {result.networkAddress}</p>
              <p>Broadcast Address: {result.broadcastAddress}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Host Range</h3>
            <div className="space-y-1">
              <p>First Host: {result.firstHost}</p>
              <p>Last Host: {result.lastHost}</p>
              <p>Available Hosts: {result.availableNodes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}