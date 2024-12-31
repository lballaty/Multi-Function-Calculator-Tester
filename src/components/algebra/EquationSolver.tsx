import React, { useState } from 'react';
import { AlgebraicEquation } from '../../utils/algebraEquations';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

interface EquationSolverProps {
  equation: AlgebraicEquation;
}

export default function EquationSolver({ equation }: EquationSolverProps) {
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    try {
      setError(null);
      const numericVariables = Object.fromEntries(
        Object.entries(variables).map(([key, value]) => [key, parseFloat(value)])
      );
      const result = equation.calculate(numericVariables);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation error');
      setResult(null);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setVariables(prev => ({ ...prev, [name]: value }));
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600">{equation.description}</p>

      <div className="space-y-2">
        {equation.variables.map(variable => (
          <EnhancedTooltipWrapper 
            key={variable.name}
            tooltip={`Enter value for ${variable.label}`}
          >
            <div className="flex items-center gap-2">
              <label className="w-24">{variable.label}:</label>
              <input
                type="number"
                value={variables[variable.name] || ''}
                onChange={(e) => handleInputChange(variable.name, e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder={`Enter ${variable.label}`}
              />
              {variable.unit && (
                <span className="text-gray-600">{variable.unit}</span>
              )}
            </div>
          </EnhancedTooltipWrapper>
        ))}
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="p-4 bg-gray-50 rounded">
          {typeof result === 'object' ? (
            Object.entries(result).map(([key, value]) => (
              <p key={key} className="font-mono">
                {key} = {typeof value === 'number' ? value.toFixed(4) : value}
              </p>
            ))
          ) : (
            <p className="font-mono">Result = {result.toFixed(4)}</p>
          )}
        </div>
      )}
    </div>
  );
}