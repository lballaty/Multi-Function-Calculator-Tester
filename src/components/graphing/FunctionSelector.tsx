import React from 'react';
import { GraphFunction } from '../../utils/graphing/types';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

interface FunctionSelectorProps {
  selectedFunction: GraphFunction;
  functions: GraphFunction[];
  onSelect: (fn: GraphFunction) => void;
}

export default function FunctionSelector({
  selectedFunction,
  functions,
  onSelect
}: FunctionSelectorProps) {
  return (
    <EnhancedTooltipWrapper tooltip="Select a function to graph">
      <select
        value={selectedFunction.id}
        onChange={(e) => {
          const fn = functions.find(f => f.id === e.target.value);
          if (fn) onSelect(fn);
        }}
        className="w-full p-2 border rounded"
      >
        {functions.map(fn => (
          <option key={fn.id} value={fn.id}>
            {fn.name} - {fn.description}
          </option>
        ))}
      </select>
    </EnhancedTooltipWrapper>
  );
}