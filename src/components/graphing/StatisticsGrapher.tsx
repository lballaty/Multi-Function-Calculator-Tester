import React, { useState } from 'react';
import { calculateStatistics } from '../../utils/graphing/statistics';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';
import HistogramCanvas from './HistogramCanvas';
import StatisticsTable from './StatisticsTable';
import { BoxPlot } from './BoxPlot';

export default function StatisticsGrapher() {
  const [data, setData] = useState<number[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [bins, setBins] = useState(10);

  const addValue = () => {
    const value = parseFloat(input);
    if (isNaN(value)) {
      setError('Please enter a valid number');
      return;
    }

    const newData = [...data, value];
    setData(newData);
    setInput('');
    setError(null);
    setStats(calculateStatistics(newData));
  };

  const clearData = () => {
    setData([]);
    setStats(null);
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addValue();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <EnhancedTooltipWrapper tooltip="Enter a numeric value and press Enter or click Add">
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter value"
            className="flex-1 p-2 border rounded"
          />
        </EnhancedTooltipWrapper>
        
        <button
          onClick={addValue}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Add
        </button>
        
        <button
          onClick={clearData}
          className="bg-gray-200 text-gray-700 px-4 rounded hover:bg-gray-300"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}

      {data.length > 0 && (
        <div className="space-y-6">
          <StatisticsTable stats={stats} />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Histogram</h3>
            <div className="flex items-center gap-4 mb-2">
              <label className="text-sm">Number of bins:</label>
              <input
                type="range"
                min="5"
                max="20"
                value={bins}
                onChange={(e) => setBins(parseInt(e.target.value))}
                className="w-48"
              />
              <span className="text-sm">{bins}</span>
            </div>
            <HistogramCanvas
              data={data}
              bins={bins}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Box Plot</h3>
            <BoxPlot data={data} />
          </div>

          <div className="p-4 bg-gray-50 rounded">
            <h3 className="text-lg font-medium mb-2">Data Points</h3>
            <div className="max-h-40 overflow-y-auto">
              {data.map((value, index) => (
                <div key={index} className="flex justify-between py-1 border-b">
                  <span>Point {index + 1}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}