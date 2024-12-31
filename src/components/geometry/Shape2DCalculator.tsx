import React, { useState } from 'react';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';
import ShapeVisualizer from './ShapeVisualizer';
import * as calculations from '../../utils/geometryCalculations';
import { ShapeInputs } from './ShapeInputs';

export default function Shape2DCalculator() {
  const [shape, setShape] = useState('circle');
  const [dimensions, setDimensions] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Record<string, number>>({});
  const [showVisualization, setShowVisualization] = useState(false);

  const calculate = () => {
    const nums = Object.fromEntries(
      Object.entries(dimensions).map(([k, v]) => [k, parseFloat(v) || 0])
    );

    let res;
    switch (shape) {
      case 'circle':
        res = calculations.calculateCircle(nums.radius);
        break;
      case 'rectangle':
        res = calculations.calculateRectangle(nums.width, nums.height);
        break;
      case 'triangle':
        res = calculations.calculateTriangle(nums.base, nums.height);
        break;
      case 'trapezoid':
        res = calculations.calculateTrapezoid(nums.a, nums.b, nums.height);
        break;
      default:
        res = {};
    }
    setResult(res);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">2D Shapes</h3>
      <select
        value={shape}
        onChange={e => {
          setShape(e.target.value);
          setDimensions({});
          setResult({});
          setShowVisualization(false);
        }}
        className="w-full p-2 border rounded"
      >
        <option value="circle">Circle</option>
        <option value="rectangle">Rectangle</option>
        <option value="triangle">Triangle</option>
        <option value="trapezoid">Trapezoid</option>
      </select>

      <div className="space-y-4">
        <ShapeInputs
          shape={shape}
          dimensions={dimensions}
          onChange={setDimensions}
        />
        
        <button
          onClick={calculate}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Calculate
        </button>

        {Object.keys(result).length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            {Object.entries(result).map(([key, value]) => (
              <p key={key} className="capitalize">
                {key}: <span className="font-semibold">{value.toFixed(2)}</span>
              </p>
            ))}
            <button
              onClick={() => setShowVisualization(!showVisualization)}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              {showVisualization ? 'Hide' : 'Show'} Visualization
            </button>
          </div>
        )}

        {showVisualization && (
          <div className="mt-4">
            <ShapeVisualizer shape={shape} dimensions={dimensions} />
          </div>
        )}
      </div>
    </div>
  );
}