import React from 'react';
import { AlgebraicEquation } from '../../utils/algebraEquations';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

interface EquationSelectorProps {
  equations: AlgebraicEquation[];
  selectedEquation: AlgebraicEquation | null;
  onSelect: (equation: AlgebraicEquation) => void;
}

export default function EquationSelector({ 
  equations, 
  selectedEquation, 
  onSelect 
}: EquationSelectorProps) {
  return (
    <EnhancedTooltipWrapper tooltip="Select an algebraic equation to solve">
      <select
        value={selectedEquation?.id || ''}
        onChange={(e) => {
          const equation = equations.find(eq => eq.id === e.target.value);
          if (equation) onSelect(equation);
        }}
        className="w-full p-2 border rounded"
      >
        <option value="">Select an equation</option>
        {equations.map(equation => (
          <option key={equation.id} value={equation.id}>
            {equation.name}
          </option>
        ))}
      </select>
    </EnhancedTooltipWrapper>
  );
}