import React from 'react';
import { LineChart, BarChart, PieChart } from 'lucide-react';

interface GraphingTabsProps {
  mode: string;
  onChange: (mode: 'function' | 'data' | 'statistics') => void;
}

export default function GraphingTabs({ mode, onChange }: GraphingTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        <button
          onClick={() => onChange('function')}
          className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
            mode === 'function'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <LineChart className="h-5 w-5 mr-2" />
          Function Grapher
        </button>

        <button
          onClick={() => onChange('data')}
          className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
            mode === 'data'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <BarChart className="h-5 w-5 mr-2" />
          Data Plotter
        </button>

        <button
          onClick={() => onChange('statistics')}
          className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
            mode === 'statistics'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <PieChart className="h-5 w-5 mr-2" />
          Statistics
        </button>
      </nav>
    </div>
  );
}