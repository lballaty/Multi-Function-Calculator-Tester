import React, { useState } from 'react';
import * as matrixOps from '../../utils/algebra/matrixCalculations';
import { Matrix, MatrixOperation } from '../../utils/algebra/types';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

const operations: MatrixOperation[] = [
  {
    id: 'add',
    name: 'Addition',
    description: 'Add two matrices',
    operation: matrixOps.addMatrices,
    requiresSecondMatrix: true
  },
  {
    id: 'subtract',
    name: 'Subtraction',
    description: 'Subtract second matrix from first',
    operation: matrixOps.subtractMatrices,
    requiresSecondMatrix: true
  },
  {
    id: 'multiply',
    name: 'Multiplication',
    description: 'Multiply two matrices',
    operation: matrixOps.multiplyMatrices,
    requiresSecondMatrix: true
  },
  {
    id: 'scalar',
    name: 'Scalar Multiplication',
    description: 'Multiply matrix by a scalar',
    operation: matrixOps.scalarMultiply,
    requiresScalar: true
  },
  {
    id: 'transpose',
    name: 'Transpose',
    description: 'Transpose the matrix',
    operation: matrixOps.transpose
  },
  {
    id: 'determinant',
    name: 'Determinant',
    description: 'Calculate matrix determinant',
    operation: matrixOps.determinant
  }
];

export default function MatrixCalculator() {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [matrixA, setMatrixA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<Matrix>([[0, 0], [0, 0]]);
  const [scalar, setScalar] = useState(1);
  const [selectedOp, setSelectedOp] = useState<MatrixOperation>(operations[0]);
  const [result, setResult] = useState<Matrix | number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateDimensions = (newRows: number, newCols: number) => {
    setRows(newRows);
    setCols(newCols);
    setMatrixA(Array(newRows).fill(0).map(() => Array(newCols).fill(0)));
    setMatrixB(Array(newRows).fill(0).map(() => Array(newCols).fill(0)));
    setResult(null);
    setError(null);
  };

  const updateMatrix = (matrix: 'A' | 'B', row: number, col: number, value: string) => {
    const targetMatrix = matrix === 'A' ? matrixA : matrixB;
    const newMatrix = targetMatrix.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? Number(value) || 0 : c))
    );
    if (matrix === 'A') setMatrixA(newMatrix);
    else setMatrixB(newMatrix);
    setResult(null);
    setError(null);
  };

  const calculate = () => {
    try {
      setError(null);
      if (selectedOp.requiresSecondMatrix) {
        setResult(selectedOp.operation(matrixA, matrixB) as Matrix);
      } else if (selectedOp.requiresScalar) {
        setResult(selectedOp.operation(matrixA, scalar) as Matrix);
      } else {
        setResult(selectedOp.operation(matrixA));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation error');
      setResult(null);
    }
  };

  const renderMatrix = (matrix: Matrix, label: string, editable: boolean = true) => (
    <div className="space-y-2">
      <h4 className="font-medium">{label}</h4>
      <div className="inline-block border rounded p-2">
        {matrix.map((row, i) => (
          <div key={i} className="flex gap-2">
            {row.map((val, j) => (
              <input
                key={j}
                type="number"
                value={val}
                onChange={(e) => editable && updateMatrix(label === 'Matrix A' ? 'A' : 'B', i, j, e.target.value)}
                className="w-16 p-1 border rounded text-center"
                readOnly={!editable}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Matrix Calculator</h3>
        
        <div className="flex gap-4">
          <EnhancedTooltipWrapper tooltip="Select number of rows">
            <input
              type="number"
              min="1"
              max="5"
              value={rows}
              onChange={(e) => updateDimensions(Number(e.target.value), cols)}
              className="w-20 p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
          <span>×</span>
          <EnhancedTooltipWrapper tooltip="Select number of columns">
            <input
              type="number"
              min="1"
              max="5"
              value={cols}
              onChange={(e) => updateDimensions(rows, Number(e.target.value))}
              className="w-20 p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
        </div>

        <EnhancedTooltipWrapper tooltip="Select matrix operation">
          <select
            value={selectedOp.id}
            onChange={(e) => {
              const op = operations.find(o => o.id === e.target.value);
              if (op) setSelectedOp(op);
            }}
            className="w-full p-2 border rounded"
          >
            {operations.map(op => (
              <option key={op.id} value={op.id}>{op.name}</option>
            ))}
          </select>
        </EnhancedTooltipWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderMatrix(matrixA, 'Matrix A')}
          {(selectedOp.requiresSecondMatrix || selectedOp.requiresScalar) && (
            selectedOp.requiresScalar ? (
              <div className="space-y-2">
                <h4 className="font-medium">Scalar</h4>
                <input
                  type="number"
                  value={scalar}
                  onChange={(e) => setScalar(Number(e.target.value))}
                  className="w-20 p-2 border rounded"
                />
              </div>
            ) : (
              renderMatrix(matrixB, 'Matrix B')
            )
          )}
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
              renderMatrix(result, 'Result', false)
            )}
          </div>
        )}
      </div>
    </div>
  );
}