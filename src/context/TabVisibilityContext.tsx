import React, { createContext, useContext, useState, useEffect } from 'react';
import { TabVisibilityState, TabGroup } from '../utils/tabs/types';
import { saveTabGroups, getTabGroups, saveActiveGroup, getActiveGroup } from '../utils/tabs/storage';

interface TabVisibilityContextType {
  state: TabVisibilityState;
  toggleTabs: () => void;
  createGroup: (name: string, tabs: string[]) => void;
  updateGroup: (id: string, updates: Partial<TabGroup>) => void;
  deleteGroup: (id: string) => void;
  setActiveGroup: (id: string | null) => void;
}

const TabVisibilityContext = createContext<TabVisibilityContextType | undefined>(undefined);

export function TabVisibilityProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TabVisibilityState>({
    hiddenTabs: false,
    activeGroupId: null,
    groups: []
  });

  // Load saved state on mount
  useEffect(() => {
    const savedGroups = getTabGroups();
    const activeGroupId = getActiveGroup();
    setState(prev => ({
      ...prev,
      groups: savedGroups,
      activeGroupId
    }));
  }, []);

  const toggleTabs = () => {
    setState(prev => ({ ...prev, hiddenTabs: !prev.hiddenTabs }));
  };

  const createGroup = (name: string, tabs: string[]) => {
    const newGroup: TabGroup = {
      id: crypto.randomUUID(),
      name,
      tabs
    };
    
    setState(prev => {
      const newGroups = [...prev.groups, newGroup];
      saveTabGroups(newGroups);
      return { ...prev, groups: newGroups };
    });
  };

  const updateGroup = (id: string, updates: Partial<TabGroup>) => {
    setState(prev => {
      const newGroups = prev.groups.map(group =>
        group.id === id ? { ...group, ...updates } : group
      );
      saveTabGroups(newGroups);
      return { ...prev, groups: newGroups };
    });
  };

  const deleteGroup = (id: string) => {
    setState(prev => {
      const newGroups = prev.groups.filter(group => group.id !== id);
      saveTabGroups(newGroups);
      
      // If deleting active group, clear active group
      if (prev.activeGroupId === id) {
        saveActiveGroup(null);
        return { ...prev, groups: newGroups, activeGroupId: null };
      }
      
      return { ...prev, groups: newGroups };
    });
  };

  const setActiveGroup = (id: string | null) => {
    saveActiveGroup(id);
    setState(prev => ({ ...prev, activeGroupId: id }));
  };

  return (
    <TabVisibilityContext.Provider value={{
      state,
      toggleTabs,
      createGroup,
      updateGroup,
      deleteGroup,
      setActiveGroup
    }}>
      {children}
    </TabVisibilityContext.Provider>
  );
}

export function useTabVisibility() {
  const context = useContext(TabVisibilityContext);
  if (!context) {
    throw new Error('useTabVisibility must be used within a TabVisibilityProvider');
  }
  return context;
}