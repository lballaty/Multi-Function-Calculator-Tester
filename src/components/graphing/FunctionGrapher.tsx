import React, { useState } from 'react';
import { commonFunctions } from '../../utils/graphing/commonFunctions';
import FunctionSelector from './FunctionSelector';
import VariableInputs from './VariableInputs';
import GraphCanvas from './GraphCanvas';
import { GraphFunction } from '../../utils/graphing/types';

export default function FunctionGrapher() {
  const [selectedFunction, setSelectedFunction] = useState<GraphFunction>(commonFunctions[0]);
  const [variables, setVariables] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  const handleVariableChange = (name: string, value: number) => {
    setVariables(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <FunctionSelector
        selectedFunction={selectedFunction}
        functions={commonFunctions}
        onSelect={setSelectedFunction}
      />

      <VariableInputs
        selectedFunction={selectedFunction}
        variables={variables}
        onChange={handleVariableChange}
      />

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}

      <GraphCanvas
        selectedFunction={selectedFunction}
        variables={variables}
        onError={setError}
      />
    </div>
  );
}