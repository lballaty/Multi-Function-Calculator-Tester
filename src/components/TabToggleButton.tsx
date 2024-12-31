import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useTabVisibility } from '../context/TabVisibilityContext';

export default function TabToggleButton() {
  const { state, toggleTabs } = useTabVisibility();

  return (
    <button
      onClick={toggleTabs}
      className="fixed left-4 top-20 p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-white"
      title={state.hiddenTabs ? "Show tabs" : "Hide tabs"}
    >
      {state.hiddenTabs ? (
        <ChevronDown className="h-5 w-5 text-gray-600" />
      ) : (
        <ChevronUp className="h-5 w-5 text-gray-600" />
      )}
    </button>
  );
}