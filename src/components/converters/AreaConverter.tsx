import React, { useState, useEffect } from 'react';
import { convert } from '../../utils/conversionCalculator';
import { conversions } from '../../utils/conversionTypes';
import BaseConverter from './BaseConverter';

const units = Object.keys(conversions.area);

export default function AreaConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState(units[0]);
  const [toUnit, setToUnit] = useState(units[1]);
  const [result, setResult] = useState('');

  useEffect(() => {
    if (value) {
      const converted = convert(value, fromUnit, toUnit, 'area', conversions);
      setResult(converted);
    } else {
      setResult('');
    }
  }, [value, fromUnit, toUnit]);

  return (
    <BaseConverter
      value={value}
      fromUnit={fromUnit}
      toUnit={toUnit}
      units={units}
      result={result}
      onValueChange={setValue}
      onFromUnitChange={setFromUnit}
      onToUnitChange={setToUnit}
    />
  );
}