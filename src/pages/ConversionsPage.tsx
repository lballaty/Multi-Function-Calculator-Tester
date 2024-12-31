import React, { useState } from 'react';
import DocLink from '../components/DocLink';
import LengthConverter from '../components/converters/LengthConverter';
import AreaConverter from '../components/converters/AreaConverter';
import VolumeConverter from '../components/converters/VolumeConverter';
import WeightConverter from '../components/converters/WeightConverter';
import TemperatureConverter from '../components/converters/TemperatureConverter';
import SpeedConverter from '../components/converters/SpeedConverter';
import TimeConverter from '../components/converters/TimeConverter';
import EnergyConverter from '../components/converters/EnergyConverter';
import PowerConverter from '../components/converters/PowerConverter';
import PressureConverter from '../components/converters/PressureConverter';
import CurrencyConverter from '../components/converters/CurrencyConverter';

type ConverterType = 
  | 'length' 
  | 'area' 
  | 'volume' 
  | 'weight' 
  | 'temperature' 
  | 'speed' 
  | 'time' 
  | 'energy' 
  | 'power' 
  | 'pressure' 
  | 'currency';

export default function ConversionsPage() {
  const [converterType, setConverterType] = useState<ConverterType>('length');

  const renderConverter = () => {
    switch (converterType) {
      case 'length':
        return <LengthConverter />;
      case 'area':
        return <AreaConverter />;
      case 'volume':
        return <VolumeConverter />;
      case 'weight':
        return <WeightConverter />;
      case 'temperature':
        return <TemperatureConverter />;
      case 'speed':
        return <SpeedConverter />;
      case 'time':
        return <TimeConverter />;
      case 'energy':
        return <EnergyConverter />;
      case 'power':
        return <PowerConverter />;
      case 'pressure':
        return <PressureConverter />;
      case 'currency':
        return <CurrencyConverter />;
      default:
        return null;
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
            value={converterType}
            onChange={(e) => setConverterType(e.target.value as ConverterType)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Unit Type to Convert</option>
            <option value="length">Length</option>
            <option value="area">Area</option>
            <option value="volume">Volume</option>
            <option value="weight">Weight</option>
            <option value="temperature">Temperature</option>
            <option value="speed">Speed</option>
            <option value="time">Time</option>
            <option value="energy">Energy</option>
            <option value="power">Power</option>
            <option value="pressure">Pressure</option>
            <option value="currency">Currency</option>
          </select>
        </div>

        <div className="space-y-6">
          {renderConverter()}
        </div>
      </div>
    </div>
  );
}