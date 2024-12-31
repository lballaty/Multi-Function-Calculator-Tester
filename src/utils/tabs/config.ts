import { Tab } from './types';
import { Calculator, Home, Ruler, Square, Binary, LineChart, Network, Globe } from 'lucide-react';

export const tabs: Tab[] = [
  { id: 'home', path: '/', label: 'Home', icon: 'Home' },
  { id: 'calculator', path: '/calculator', label: 'Calculator', icon: 'Calculator' },
  { id: 'conversions', path: '/conversions', label: 'Unit Conversions', icon: 'Ruler' },
  { id: 'geometry', path: '/geometry', label: 'Geometry', icon: 'Square' },
  { id: 'algebra', path: '/algebra', label: 'Algebra', icon: 'Binary' },
  { id: 'graphing', path: '/graphing', label: 'Graphing', icon: 'LineChart' },
  { id: 'ip-calculator', path: '/ip-calculator', label: 'IP Calculator', icon: 'Network' },
  { id: 'api-tester', path: '/api-tester', label: 'API Tester', icon: 'Globe' }
];

export function getTabById(id: string): Tab | undefined {
  return tabs.find(tab => tab.id === id);
}

export function getVisibleTabs(activeGroupId: string | null, groups: TabGroup[]): Tab[] {
  if (!activeGroupId) return tabs;
  
  const activeGroup = groups.find(group => group.id === activeGroupId);
  if (!activeGroup) return tabs;
  
  return activeGroup.tabs
    .map(id => getTabById(id))
    .filter((tab): tab is Tab => tab !== undefined);
}