import React from 'react';
import { X } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import ColorPicker from './ColorPicker';
import { ThemeColors } from '../utils/themeTypes';
import { calculatorSizes } from '../utils/calculatorSizes';
import TabGroupManager from './TabGroupManager';

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const { settings, updateSettings, updateCustomColors, updateCalculatorSize } = useSettings();

  const updateColor = (key: keyof ThemeColors, value: string) => {
    updateCustomColors({ [key]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md m-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Settings</h2>

          <div className="space-y-6">
            {/* Calculator Size Settings */}
            <div>
              <label className="text-lg font-medium block mb-2">Calculator Size</label>
              <select
                value={Object.keys(calculatorSizes).find(
                  key => calculatorSizes[key] === settings.calculatorSize
                ) || 'medium'}
                onChange={(e) => updateCalculatorSize(calculatorSizes[e.target.value])}
                className="w-full p-2 border rounded"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-lg font-medium">Enable Tooltips</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.tooltipsEnabled}
                  onChange={(e) => updateSettings({ tooltipsEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="text-lg font-medium block mb-2">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => updateSettings({ theme: e.target.value as 'light' | 'dark' | 'system' })}
                className="w-full p-2 border rounded"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Custom Colors</h3>
              <ColorPicker
                label="Primary Color"
                value={settings.customColors.primary || ''}
                onChange={(color) => updateColor('primary', color)}
              />
              <ColorPicker
                label="Secondary Color"
                value={settings.customColors.secondary || ''}
                onChange={(color) => updateColor('secondary', color)}
              />
              <ColorPicker
                label="Background Color"
                value={settings.customColors.background || ''}
                onChange={(color) => updateColor('background', color)}
              />
              <ColorPicker
                label="Text Color"
                value={settings.customColors.text || ''}
                onChange={(color) => updateColor('text', color)}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Tab Groups</h3>
              <TabGroupManager />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}