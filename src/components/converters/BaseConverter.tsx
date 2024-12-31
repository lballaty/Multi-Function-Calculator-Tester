import React from 'react';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

interface BaseConverterProps {
  value: string;
  fromUnit: string;
  toUnit: string;
  units: string[];
  result: string;
  onValueChange: (value: string) => void;
  onFromUnitChange: (unit: string) => void;
  onToUnitChange: (unit: string) => void;
}

export default function BaseConverter({
  value,
  fromUnit,
  toUnit,
  units,
  result,
  onValueChange,
  onFromUnitChange,
  onToUnitChange,
}: BaseConverterProps) {
  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <EnhancedTooltipWrapper tooltip="Enter the value to convert">
          <input
            type="number"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Enter value"
          />
        </EnhancedTooltipWrapper>
        
        <EnhancedTooltipWrapper tooltip="Select the source unit">
          <select
            value={fromUnit}
            onChange={(e) => onFromUnitChange(e.target.value)}
            className="flex-1 p-2 border rounded"
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </EnhancedTooltipWrapper>
      </div>

      <div className="text-center mb-4">to</div>

      <div className="flex gap-4">
        <EnhancedTooltipWrapper tooltip="Converted result">
          <input
            type="text"
            value={result}
            readOnly
            className="flex-1 p-2 border rounded bg-gray-50"
          />
        </EnhancedTooltipWrapper>
        
        <EnhancedTooltipWrapper tooltip="Select the target unit">
          <select
            value={toUnit}
            onChange={(e) => onToUnitChange(e.target.value)}
            className="flex-1 p-2 border rounded"
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </EnhancedTooltipWrapper>
      </div>
    </div>
  );
}