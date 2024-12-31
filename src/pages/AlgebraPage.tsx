import React, { useState } from 'react';
import { equations } from '../utils/algebraEquations';
import EquationSelector from '../components/algebra/EquationSelector';
import EquationSolver from '../components/algebra/EquationSolver';
import MatrixCalculator from '../components/algebra/MatrixCalculator';
import VectorCalculator from '../components/algebra/VectorCalculator';
import PositionCalculator from '../components/position/PositionCalculator';
import DocLink from '../components/DocLink';

type CalculatorType = 'equations' | 'matrices' | 'vectors' | 'position';

export default function AlgebraPage() {
  const [selectedEquation, setSelectedEquation] = useState(equations[0]);
  const [calculatorType, setCalculatorType] = useState<CalculatorType>('equations');

  const renderCalculator = () => {
    switch (calculatorType) {
      case 'matrices':
        return <MatrixCalculator />;
      case 'vectors':
        return <VectorCalculator />;
      case 'position':
        return <PositionCalculator />;
      default:
        return (
          <>
            <EquationSelector
              equations={equations}
              selectedEquation={selectedEquation}
              onSelect={setSelectedEquation}
            />
            {selectedEquation && (
              <EquationSolver equation={selectedEquation} />
            )}
          </>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-end mb-4">
        <DocLink />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="mb-6">
          <select
            value={calculatorType}
            onChange={(e) => setCalculatorType(e.target.value as CalculatorType)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Algebraic Operation Type</option>
            <option value="equations">Algebraic Equations</option>
            <option value="matrices">Matrix Operations</option>
            <option value="vectors">Vector Operations</option>
            <option value="position">Position Calculations</option>
          </select>
        </div>

        <div className="space-y-6">
          {renderCalculator()}
        </div>
      </div>
    </div>
  );
}