import React, { useState } from 'react';
import { isValidIPv4, calculateSubnet } from '../../utils/ipv4';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

interface Subnet {
  name: string;
  hosts: number;
  networkAddress?: string;
  subnetMask?: string;
  firstHost?: string;
  lastHost?: string;
  broadcast?: string;
}

export default function VLSMCalculator() {
  const [networkAddress, setNetworkAddress] = useState('');
  const [subnets, setSubnets] = useState<Subnet[]>([
    { name: 'Subnet 1', hosts: 0 }
  ]);
  const [result, setResult] = useState<Subnet[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addSubnet = () => {
    setSubnets([...subnets, { 
      name: `Subnet ${subnets.length + 1}`, 
      hosts: 0 
    }]);
  };

  const removeSubnet = (index: number) => {
    setSubnets(subnets.filter((_, i) => i !== index));
  };

  const updateSubnet = (index: number, field: keyof Subnet, value: string | number) => {
    const newSubnets = [...subnets];
    newSubnets[index] = { ...newSubnets[index], [field]: value };
    setSubnets(newSubnets);
  };

  const calculate = () => {
    try {
      setError(null);
      if (!isValidIPv4(networkAddress)) {
        throw new Error('Invalid network address');
      }

      // Sort subnets by required hosts (largest first)
      const sortedSubnets = [...subnets]
        .sort((a, b) => b.hosts - a.hosts);

      let currentAddress = networkAddress;
      const results: Subnet[] = [];

      for (const subnet of sortedSubnets) {
        const requiredBits = Math.ceil(Math.log2(subnet.hosts + 2));
        const prefix = 32 - requiredBits;
        
        const details = calculateSubnet(`${currentAddress}/${prefix}`);
        
        results.push({
          ...subnet,
          networkAddress: details.networkAddress,
          subnetMask: details.subnetMask,
          firstHost: details.firstHost,
          lastHost: details.lastHost,
          broadcast: details.broadcastAddress
        });

        // Calculate next network address
        const octets = details.broadcastAddress.split('.');
        octets[3] = (parseInt(octets[3]) + 1).toString();
        currentAddress = octets.join('.');
      }

      setResult(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation error');
      setResult([]);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">VLSM Calculator</h2>

      <EnhancedTooltipWrapper tooltip="Enter the main network address">
        <input
          type="text"
          value={networkAddress}
          onChange={(e) => setNetworkAddress(e.target.value)}
          placeholder="Network Address (e.g., 192.168.0.0)"
          className="w-full p-2 border rounded"
        />
      </EnhancedTooltipWrapper>

      <div className="space-y-4">
        {subnets.map((subnet, index) => (
          <div key={index} className="p-4 border rounded space-y-2">
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={subnet.name}
                onChange={(e) => updateSubnet(index, 'name', e.target.value)}
                className="p-2 border rounded"
                placeholder="Subnet Name"
              />
              <button
                onClick={() => removeSubnet(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
            <input
              type="number"
              value={subnet.hosts}
              onChange={(e) => updateSubnet(index, 'hosts', parseInt(e.target.value))}
              min="1"
              className="w-full p-2 border rounded"
              placeholder="Required Hosts"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={addSubnet}
          className="bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200"
        >
          Add Subnet
        </button>
        <button
          onClick={calculate}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Calculate VLSM
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}

      {result.length > 0 && (
        <div className="space-y-4">
          {result.map((subnet, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded">
              <h3 className="font-medium mb-2">{subnet.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p>Network: {subnet.networkAddress}</p>
                  <p>Subnet Mask: {subnet.subnetMask}</p>
                  <p>Broadcast: {subnet.broadcast}</p>
                </div>
                <div className="space-y-1">
                  <p>First Host: {subnet.firstHost}</p>
                  <p>Last Host: {subnet.lastHost}</p>
                  <p>Required Hosts: {subnet.hosts}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}