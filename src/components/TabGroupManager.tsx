import React, { useState } from 'react';
import { useTabVisibility } from '../context/TabVisibilityContext';
import { Settings, Plus, Trash2, Check } from 'lucide-react';
import { tabs } from '../utils/tabs/config';

export default function TabGroupManager() {
  const { state, createGroup, updateGroup, deleteGroup, setActiveGroup } = useTabVisibility();
  const [isCreating, setIsCreating] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);

  const handleCreateGroup = () => {
    if (newGroupName && selectedTabs.length > 0) {
      createGroup(newGroupName, selectedTabs);
      setNewGroupName('');
      setSelectedTabs([]);
      setIsCreating(false);
    }
  };

  const toggleTab = (tabId: string) => {
    setSelectedTabs(prev =>
      prev.includes(tabId)
        ? prev.filter(id => id !== tabId)
        : [...prev, tabId]
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Tab Groups</h3>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {isCreating && (
        <div className="space-y-4 p-4 border rounded">
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Group Name"
            className="w-full p-2 border rounded"
          />
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Select Tabs:</p>
            {tabs.map(tab => (
              <label key={tab.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedTabs.includes(tab.id)}
                  onChange={() => toggleTab(tab.id)}
                  className="rounded border-gray-300"
                />
                <span>{tab.label}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsCreating(false)}
              className="px-3 py-1 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateGroup}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {state.groups.map(group => (
          <div
            key={group.id}
            className={`flex items-center justify-between p-2 rounded ${
              state.activeGroupId === group.id ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
          >
            <button
              onClick={() => setActiveGroup(
                state.activeGroupId === group.id ? null : group.id
              )}
              className="flex-1 text-left"
            >
              {group.name}
            </button>
            <div className="flex items-center space-x-2">
              {group.isDefault && (
                <Check className="h-4 w-4 text-green-600" />
              )}
              <button
                onClick={() => updateGroup(group.id, { isDefault: !group.isDefault })}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <Settings className="h-4 w-4" />
              </button>
              <button
                onClick={() => deleteGroup(group.id)}
                className="p-1 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}