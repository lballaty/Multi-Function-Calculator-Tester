import React from 'react';
import { GraphFunction } from '../../utils/graphing/types';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

interface VariableInputsProps {
  selectedFunction: GraphFunction;
  variables: Record<string, number>;
  onChange: (name: string, value: number) => void;
}

export default function VariableInputs({
  selectedFunction,
  variables,
  onChange
}: VariableInputsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {selectedFunction.variables.map(variable => (
        <EnhancedTooltipWrapper
          key={variable.name}
          tooltip={`Enter value for ${variable.label}`}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {variable.label}
            </label>
            <input
              type="number"
              value={variables[variable.name] ?? variable.defaultValue}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) {
                  onChange(variable.name, value);
                }
              }}
              step="any"
              className="w-full p-2 border rounded"
            />
          </div>
        </EnhancedTooltipWrapper>
      ))}
    </div>
  );
}