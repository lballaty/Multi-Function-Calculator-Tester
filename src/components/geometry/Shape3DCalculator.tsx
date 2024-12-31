import React, { useState } from 'react';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';
import Shape3DVisualizer from './Shape3DVisualizer';
import * as calculations from '../../utils/geometryCalculations';
import { Shape3DInputs } from './Shape3DInputs';

export default function Shape3DCalculator() {
  const [shape, setShape] = useState('cube');
  const [dimensions, setDimensions] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Record<string, number>>({});
  const [showVisualization, setShowVisualization] = useState(false);

  const calculate = () => {
    const nums = Object.fromEntries(
      Object.entries(dimensions).map(([k, v]) => [k, parseFloat(v) || 0])
    );

    let res;
    switch (shape) {
      case 'cube':
        res = calculations.calculateCube(nums.side);
        break;
      case 'sphere':
        res = calculations.calculateSphere(nums.radius);
        break;
      case 'cylinder':
        res = calculations.calculateCylinder(nums.radius, nums.height);
        break;
      case 'cone':
        res = calculations.calculateCone(nums.radius, nums.height);
        break;
      default:
        res = {};
    }
    setResult(res);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">3D Shapes</h3>
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
        <option value="cube">Cube</option>
        <option value="sphere">Sphere</option>
        <option value="cylinder">Cylinder</option>
        <option value="cone">Cone</option>
      </select>

      <div className="space-y-4">
        <Shape3DInputs
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
            <Shape3DVisualizer shape={shape} dimensions={dimensions} />
          </div>
        )}
      </div>
    </div>
  );
}