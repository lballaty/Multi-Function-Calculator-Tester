import React, { useState, useEffect } from 'react';
import { convertTemperature } from '../../utils/temperatureConverter';
import BaseConverter from './BaseConverter';

const units = ['celsius', 'fahrenheit', 'kelvin'];

export default function TemperatureConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');
  const [result, setResult] = useState('');

  useEffect(() => {
    if (value) {
      const converted = convertTemperature(parseFloat(value), fromUnit, toUnit);
      setResult(converted.toFixed(2));
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