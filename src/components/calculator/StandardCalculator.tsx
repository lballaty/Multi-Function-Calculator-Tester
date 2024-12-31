import React from 'react';
import CalculatorButton from '../CalculatorButton';
import { useSettings } from '../../context/SettingsContext';

interface StandardCalculatorProps {
  display: string;
  equation: string;
  onNumber: (num: string) => void;
  onOperator: (op: string) => void;
  onCalculate: () => void;
  onClear: () => void;
}

export default function StandardCalculator({
  display,
  equation,
  onNumber,
  onOperator,
  onCalculate,
  onClear
}: StandardCalculatorProps) {
  const { settings } = useSettings();
  const { fontSize, displayFontSize, gap } = settings.calculatorSize;

  return (
    <div className="space-y-4">
      {/* Display Section - Fixed at top */}
      <div className="w-full bg-gray-100 p-4 rounded">
        <div className={`text-right ${displayFontSize} font-mono`}>{display}</div>
        {equation && (
          <div className={`text-right ${fontSize} text-gray-600`}>{equation}</div>
        )}
      </div>

      {/* Buttons Section - Horizontal Layout */}
      <div className="flex gap-6">
        {/* Numbers */}
        <div className="flex-1 grid grid-cols-3 gap-2">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
            <CalculatorButton
              key={num}
              onClick={() => onNumber(num.toString())}
              variant="number"
            >
              {num}
            </CalculatorButton>
          ))}
        </div>

        {/* Operators */}
        <div className="w-48 grid grid-cols-2 gap-2">
          {['+', '-', '×', '÷'].map((op) => (
            <CalculatorButton
              key={op}
              onClick={() => onOperator(op)}
              variant="operator"
            >
              {op}
            </CalculatorButton>
          ))}

          {/* Actions */}
          <CalculatorButton
            onClick={onCalculate}
            variant="action"
            className="col-span-2"
          >
            =
          </CalculatorButton>
          <CalculatorButton
            onClick={onClear}
            variant="operator"
            className="col-span-2"
          >
            C
          </CalculatorButton>
        </div>
      </div>
    </div>
  );
}