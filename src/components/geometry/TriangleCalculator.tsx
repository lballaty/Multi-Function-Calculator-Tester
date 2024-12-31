import React, { useState } from 'react';
import { calculateTriangle } from '../../utils/geometry/triangleCalculations';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

export default function TriangleCalculator() {
  const [inputs, setInputs] = useState({
    a: '',
    b: '',
    c: '',
    angleA: '',
    angleB: '',
    angleC: ''
  });

  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const values = Object.fromEntries(
      Object.entries(inputs)
        .map(([key, value]) => [key, value ? parseFloat(value) : undefined])
    );
    
    const result = calculateTriangle(values);
    setResult(result);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Triangle Calculator</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-medium">Sides</h4>
          <EnhancedTooltipWrapper tooltip="Enter side a length">
            <input
              type="number"
              value={inputs.a}
              onChange={e => setInputs({ ...inputs, a: e.target.value })}
              placeholder="Side a"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
          <EnhancedTooltipWrapper tooltip="Enter side b length">
            <input
              type="number"
              value={inputs.b}
              onChange={e => setInputs({ ...inputs, b: e.target.value })}
              placeholder="Side b"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
          <EnhancedTooltipWrapper tooltip="Enter side c length">
            <input
              type="number"
              value={inputs.c}
              onChange={e => setInputs({ ...inputs, c: e.target.value })}
              placeholder="Side c"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Angles (degrees)</h4>
          <EnhancedTooltipWrapper tooltip="Enter angle A">
            <input
              type="number"
              value={inputs.angleA}
              onChange={e => setInputs({ ...inputs, angleA: e.target.value })}
              placeholder="Angle A"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
          <EnhancedTooltipWrapper tooltip="Enter angle B">
            <input
              type="number"
              value={inputs.angleB}
              onChange={e => setInputs({ ...inputs, angleB: e.target.value })}
              placeholder="Angle B"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
          <EnhancedTooltipWrapper tooltip="Enter angle C">
            <input
              type="number"
              value={inputs.angleC}
              onChange={e => setInputs({ ...inputs, angleC: e.target.value })}
              placeholder="Angle C"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded space-y-2">
          {result.area && <p>Area: <span className="font-semibold">{result.area.toFixed(2)}</span></p>}
          {result.perimeter && <p>Perimeter: <span className="font-semibold">{result.perimeter.toFixed(2)}</span></p>}
          {result.angleA && <p>Angle A: <span className="font-semibold">{result.angleA.toFixed(2)}°</span></p>}
          {result.angleB && <p>Angle B: <span className="font-semibold">{result.angleB.toFixed(2)}°</span></p>}
          {result.angleC && <p>Angle C: <span className="font-semibold">{result.angleC.toFixed(2)}°</span></p>}
          {result.a && <p>Side a: <span className="font-semibold">{result.a.toFixed(2)}</span></p>}
          {result.b && <p>Side b: <span className="font-semibold">{result.b.toFixed(2)}</span></p>}
          {result.c && <p>Side c: <span className="font-semibold">{result.c.toFixed(2)}</span></p>}
        </div>
      )}
    </div>
  );
}