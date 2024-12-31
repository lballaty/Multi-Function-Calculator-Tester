import React, { useState } from 'react';
import { calculateBandwidth, calculateTransferTime } from '../../utils/networkCalculations';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

export default function BandwidthCalculator() {
  const [fileSize, setFileSize] = useState('');
  const [fileSizeUnit, setFileSizeUnit] = useState('MB');
  const [bandwidth, setBandwidth] = useState('');
  const [bandwidthUnit, setBandwidthUnit] = useState('Mbps');
  const [result, setResult] = useState<string | null>(null);

  const calculateTime = () => {
    const time = calculateTransferTime(
      parseFloat(fileSize),
      parseFloat(bandwidth),
      fileSizeUnit,
      bandwidthUnit
    );
    
    if (time < 60) {
      setResult(`${time.toFixed(2)} seconds`);
    } else if (time < 3600) {
      setResult(`${(time / 60).toFixed(2)} minutes`);
    } else {
      setResult(`${(time / 3600).toFixed(2)} hours`);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Transfer Time Calculator</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <EnhancedTooltipWrapper tooltip="Enter the file size">
          <div>
            <input
              type="number"
              value={fileSize}
              onChange={(e) => setFileSize(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="File size"
            />
          </div>
        </EnhancedTooltipWrapper>
        
        <EnhancedTooltipWrapper tooltip="Select file size unit">
          <select
            value={fileSizeUnit}
            onChange={(e) => setFileSizeUnit(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="B">Bytes</option>
            <option value="KB">Kilobytes</option>
            <option value="MB">Megabytes</option>
            <option value="GB">Gigabytes</option>
          </select>
        </EnhancedTooltipWrapper>
        
        <EnhancedTooltipWrapper tooltip="Enter the bandwidth">
          <input
            type="number"
            value={bandwidth}
            onChange={(e) => setBandwidth(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Bandwidth"
          />
        </EnhancedTooltipWrapper>
        
        <EnhancedTooltipWrapper tooltip="Select bandwidth unit">
          <select
            value={bandwidthUnit}
            onChange={(e) => setBandwidthUnit(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="bps">bps</option>
            <option value="Kbps">Kbps</option>
            <option value="Mbps">Mbps</option>
            <option value="Gbps">Gbps</option>
          </select>
        </EnhancedTooltipWrapper>
      </div>

      <button
        onClick={calculateTime}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Calculate Transfer Time
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <p className="text-lg">Transfer Time: {result}</p>
        </div>
      )}
    </div>
  );
}