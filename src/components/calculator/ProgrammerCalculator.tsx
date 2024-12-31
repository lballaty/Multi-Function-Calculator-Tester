import React from 'react';
import CalculatorButton from '../CalculatorButton';
import { useSettings } from '../../context/SettingsContext';
import { toBinary, toHex, toOctal } from '../../utils/programmerCalculations';

interface ProgrammerCalculatorProps {
  display: string;
  equation: string;
  onNumber: (num: string) => void;
  onOperator: (op: string) => void;
  onCalculate: () => void;
  onClear: () => void;
}

export default function ProgrammerCalculator({
  display,
  equation,
  onNumber,
  onOperator,
  onCalculate,
  onClear
}: ProgrammerCalculatorProps) {
  const { settings } = useSettings();
  const { fontSize, displayFontSize, gap } = settings.calculatorSize;

  const displayValue = parseInt(display) || 0;

  return (
    <div className="space-y-4">
      {/* Display Section - Fixed at top */}
      <div className="w-full bg-gray-100 p-4 rounded space-y-2">
        <div className={`text-right ${displayFontSize} font-mono`}>{display}</div>
        <div className={`text-right ${fontSize} text-gray-600 font-mono`}>
          BIN: {toBinary(display)}
        </div>
        <div className={`text-right ${fontSize} text-gray-600 font-mono`}>
          HEX: {toHex(display)}
        </div>
        <div className={`text-right ${fontSize} text-gray-600 font-mono`}>
          OCT: {toOctal(display)}
        </div>
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

        {/* Bitwise Operators */}
        <div className="w-96 grid grid-cols-4 gap-2">
          <CalculatorButton onClick={() => onOperator('&')} variant="operator">&amp;</CalculatorButton>
          <CalculatorButton onClick={() => onOperator('|')} variant="operator">|</CalculatorButton>
          <CalculatorButton onClick={() => onOperator('^')} variant="operator">XOR</CalculatorButton>
          <CalculatorButton onClick={() => onOperator('<<')} variant="operator">&lt;&lt;</CalculatorButton>
          <CalculatorButton onClick={() => onOperator('>>')} variant="operator">&gt;&gt;</CalculatorButton>
          <CalculatorButton onClick={() => onOperator('%')} variant="operator">MOD</CalculatorButton>
          <CalculatorButton onClick={() => onOperator('\\')} variant="operator">DIV</CalculatorButton>

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