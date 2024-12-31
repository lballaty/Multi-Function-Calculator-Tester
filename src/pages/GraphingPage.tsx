import React, { useState } from 'react';
import DocLink from '../components/DocLink';
import GraphingTabs from '../components/graphing/GraphingTabs';
import FunctionGrapher from '../components/graphing/FunctionGrapher';
import DataGrapher from '../components/graphing/DataGrapher';
import StatisticsGrapher from '../components/graphing/StatisticsGrapher';

type GraphingMode = 'function' | 'data' | 'statistics';

export default function GraphingPage() {
  const [mode, setMode] = useState<GraphingMode>('function');

  const renderGrapher = () => {
    switch (mode) {
      case 'function':
        return <FunctionGrapher />;
      case 'data':
        return <DataGrapher />;
      case 'statistics':
        return <StatisticsGrapher />;
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
        <GraphingTabs mode={mode} onChange={setMode} />
        
        <div className="mt-6">
          {renderGrapher()}
        </div>
      </div>
    </div>
  );
}