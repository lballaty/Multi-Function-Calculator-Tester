import React, { useState } from 'react';
import * as vectorOps from '../../utils/algebra/matrixCalculations';
import { Vector, VectorOperation } from '../../utils/algebra/types';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

const operations: VectorOperation[] = [
  {
    id: 'add',
    name: 'Addition',
    description: 'Add two vectors',
    operation: vectorOps.addVectors,
    requiresSecondVector: true
  },
  {
    id: 'subtract',
    name: 'Subtraction',
    description: 'Subtract second vector from first',
    operation: vectorOps.subtractVectors,
    requiresSecondVector: true
  },
  {
    id: 'dot',
    name: 'Dot Product',
    description: 'Calculate dot product',
    operation: vectorOps.dotProduct,
    requiresSecondVector: true
  },
  {
    id: 'cross',
    name: 'Cross Product',
    description: 'Calculate cross product (3D only)',
    operation: vectorOps.crossProduct,
    requiresSecondVector: true,
    dimensions: 3
  },
  {
    id: 'magnitude',
    name: 'Magnitude',
    description: 'Calculate vector magnitude',
    operation: vectorOps.magnitude
  },
  {
    id: 'normalize',
    name: 'Normalize',
    description: 'Normalize vector',
    operation: vectorOps.normalize
  }
];

export default function VectorCalculator() {
  const [dimensions, setDimensions] = useState(3);
  const [vectorA, setVectorA] = useState<Vector>(Array(3).fill(0));
  const [vectorB, setVectorB] = useState<Vector>(Array(3).fill(0));
  const [selectedOp, setSelectedOp] = useState<VectorOperation>(operations[0]);
  const [result, setResult] = useState<Vector | number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateDimensions = (newDim: number) => {
    setDimensions(newDim);
    setVectorA(Array(newDim).fill(0));
    setVectorB(Array(newDim).fill(0));
    setResult(null);
    setError(null);
  };

  const updateVector = (vector: 'A' | 'B', index: number, value: string) => {
    const targetVector = vector === 'A' ? vectorA : vectorB;
    const newVector = targetVector.map((v, i) => i === index ? Number(value) || 0 : v);
    if (vector === 'A') setVectorA(newVector);
    else setVectorB(newVector);
    setResult(null);
    setError(null);
  };

  const calculate = () => {
    try {
      setError(null);
      if (selectedOp.dimensions && dimensions !== selectedOp.dimensions) {
        throw new Error(`Operation requires ${selectedOp.dimensions}D vectors`);
      }
      if (selectedOp.requiresSecondVector) {
        setResult(selectedOp.operation(vectorA, vectorB));
      } else {
        setResult(selectedOp.operation(vectorA));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation error');
      setResult(null);
    }
  };

  const renderVector = (vector: Vector, label: string, editable: boolean = true) => (
    <div className="space-y-2">
      <h4 className="font-medium">{label}</h4>
      <div className="flex gap-2">
        {vector.map((val, i) => (
          <input
            key={i}
            type="number"
            value={val}
            onChange={(e) => editable && updateVector(label === 'Vector A' ? 'A' : 'B', i, e.target.value)}
            className="w-16 p-1 border rounded text-center"
            readOnly={!editable}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Vector Calculator</h3>

        <EnhancedTooltipWrapper tooltip="Select vector dimensions">
          <select
            value={dimensions}
            onChange={(e) => updateDimensions(Number(e.target.value))}
            className="w-full p-2 border rounded"
            disabled={selectedOp.dimensions !== undefined}
          >
            <option value={2}>2D Vector</option>
            <option value={3}>3D Vector</option>
            <option value={4}>4D Vector</option>
          </select>
        </EnhancedTooltipWrapper>

        <EnhancedTooltipWrapper tooltip="Select vector operation">
          <select
            value={selectedOp.id}
            onChange={(e) => {
              const op = operations.find(o => o.id === e.target.value);
              if (op) {
                setSelectedOp(op);
                if (op.dimensions) updateDimensions(op.dimensions);
              }
            }}
            className="w-full p-2 border rounded"
          >
            {operations.map(op => (
              <option key={op.id} value={op.id}>{op.name}</option>
            ))}
          </select>
        </EnhancedTooltipWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderVector(vectorA, 'Vector A')}
          {selectedOp.requiresSecondVector && renderVector(vectorB, 'Vector B')}
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

        {result !== null && (
          <div className="p-4 bg-gray-50 rounded">
            <h4 className="font-medium mb-2">Result:</h4>
            {typeof result === 'number' ? (
              <span className="font-mono">{result}</span>
            ) : (
              renderVector(result, 'Result', false)
            )}
          </div>
        )}
      </div>
    </div>
  );
}