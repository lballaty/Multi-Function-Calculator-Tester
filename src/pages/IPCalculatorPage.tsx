import React, { useState } from 'react';
import IPCalculator from '../components/network/IPCalculator';
import SubnetCalculator from '../components/network/SubnetCalculator';
import VLSMCalculator from '../components/network/VLSMCalculator';
import IPv6Calculator from '../components/network/IPv6Calculator';
import DocLink from '../components/DocLink';

type CalculatorType = 'ip' | 'subnet' | 'vlsm' | 'ipv6';

export default function IPCalculatorPage() {
  const [calculatorType, setCalculatorType] = useState<CalculatorType>('ip');

  const renderCalculator = () => {
    switch (calculatorType) {
      case 'ip':
        return <IPCalculator />;
      case 'subnet':
        return <SubnetCalculator />;
      case 'vlsm':
        return <VLSMCalculator />;
      case 'ipv6':
        return <IPv6Calculator />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
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
            <option value="">Select Network Calculator Type</option>
            <option value="ip">IP Calculator</option>
            <option value="subnet">Subnet Calculator</option>
            <option value="vlsm">VLSM Calculator</option>
            <option value="ipv6">IPv6 Calculator</option>
          </select>
        </div>

        {renderCalculator()}
      </div>
    </div>
  );
}