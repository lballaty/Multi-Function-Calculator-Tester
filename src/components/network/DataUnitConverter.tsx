import React, { useState, useEffect } from 'react';
import { convertDataUnits } from '../../utils/networkCalculations';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

const units = ['b', 'B', 'Kb', 'KB', 'Mb', 'MB', 'Gb', 'GB'];

export default function DataUnitConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('MB');
  const [toUnit, setToUnit] = useState('Mb');
  const [result, setResult] = useState('');

  useEffect(() => {
    if (value && !isNaN(parseFloat(value))) {
      const converted = convertDataUnits(parseFloat(value), fromUnit, toUnit);
      setResult(converted.toFixed(2));
    } else {
      setResult('');
    }
  }, [value, fromUnit, toUnit]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Data Unit Converter</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <EnhancedTooltipWrapper tooltip="Enter the value to convert">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter value"
          />
        </EnhancedTooltipWrapper>
        
        <EnhancedTooltipWrapper tooltip="Select source unit">
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {units.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </EnhancedTooltipWrapper>
        
        <EnhancedTooltipWrapper tooltip="Conversion result">
          <input
            type="text"
            value={result}
            readOnly
            className="w-full p-2 border rounded bg-gray-50"
          />
        </EnhancedTooltipWrapper>
        
        <EnhancedTooltipWrapper tooltip="Select target unit">
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {units.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </EnhancedTooltipWrapper>
      </div>
    </div>
  );
}