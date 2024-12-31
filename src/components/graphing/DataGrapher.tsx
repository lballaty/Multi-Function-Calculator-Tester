import React, { useState } from 'react';
import { Point } from '../../utils/graphing/types';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';
import GraphCanvas from './GraphCanvas';

export default function DataGrapher() {
  const [points, setPoints] = useState<Point[]>([]);
  const [inputX, setInputX] = useState('');
  const [inputY, setInputY] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addPoint = () => {
    const x = parseFloat(inputX);
    const y = parseFloat(inputY);
    
    if (isNaN(x) || isNaN(y)) {
      setError('Please enter valid numbers');
      return;
    }

    setPoints([...points, { x, y }]);
    setInputX('');
    setInputY('');
    setError(null);
  };

  const clearPoints = () => {
    setPoints([]);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <EnhancedTooltipWrapper tooltip="Enter X coordinate">
          <input
            type="number"
            value={inputX}
            onChange={(e) => setInputX(e.target.value)}
            placeholder="X value"
            className="w-full p-2 border rounded"
          />
        </EnhancedTooltipWrapper>

        <EnhancedTooltipWrapper tooltip="Enter Y coordinate">
          <input
            type="number"
            value={inputY}
            onChange={(e) => setInputY(e.target.value)}
            placeholder="Y value"
            className="w-full p-2 border rounded"
          />
        </EnhancedTooltipWrapper>
      </div>

      <div className="flex gap-4">
        <button
          onClick={addPoint}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Point
        </button>
        <button
          onClick={clearPoints}
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}

      <GraphCanvas
        points={points}
        onError={setError}
      />

      {points.length > 0 && (
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">Data Points</h3>
          <div className="max-h-40 overflow-y-auto">
            {points.map((point, index) => (
              <div key={index} className="flex justify-between py-1">
                <span>Point {index + 1}:</span>
                <span>({point.x.toFixed(2)}, {point.y.toFixed(2)})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}