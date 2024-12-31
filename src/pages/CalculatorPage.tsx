import React, { useReducer } from 'react';
import { calculatorReducer, initialState } from '../utils/calculatorReducer';
import { CalculatorMode } from '../utils/calculatorTypes';
import StandardCalculator from '../components/calculator/StandardCalculator';
import ProgrammerCalculator from '../components/calculator/ProgrammerCalculator';
import DocLink from '../components/DocLink';

export default function CalculatorPage() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const [mode, setMode] = React.useState<CalculatorMode>('standard');

  const handleNumber = (num: string) => {
    dispatch({ type: 'NUMBER', payload: num });
  };

  const handleOperator = (op: string) => {
    dispatch({ type: 'OPERATOR', payload: op });
  };

  const handleCalculate = () => {
    dispatch({ type: 'CALCULATE' });
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR' });
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <DocLink />
      </div>
      
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as CalculatorMode)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Calculator Type</option>
            <option value="standard">Standard Calculator</option>
            <option value="programmer">Programmer Calculator</option>
          </select>
        </div>

        {mode === 'standard' ? (
          <StandardCalculator
            display={state.display}
            equation={state.equation}
            onNumber={handleNumber}
            onOperator={handleOperator}
            onCalculate={handleCalculate}
            onClear={handleClear}
          />
        ) : (
          <ProgrammerCalculator
            display={state.display}
            equation={state.equation}
            onNumber={handleNumber}
            onOperator={handleOperator}
            onCalculate={handleCalculate}
            onClear={handleClear}
          />
        )}
      </div>
    </div>
  );
}