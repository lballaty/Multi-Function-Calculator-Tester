import { TabGroup } from './types';

const TAB_GROUPS_KEY = 'tabGroups';
const ACTIVE_GROUP_KEY = 'activeTabGroup';

export function saveTabGroups(groups: TabGroup[]): void {
  localStorage.setItem(TAB_GROUPS_KEY, JSON.stringify(groups));
}

export function getTabGroups(): TabGroup[] {
  const saved = localStorage.getItem(TAB_GROUPS_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveActiveGroup(groupId: string | null): void {
  if (groupId) {
    localStorage.setItem(ACTIVE_GROUP_KEY, groupId);
  } else {
    localStorage.removeItem(ACTIVE_GROUP_KEY);
  }
}

export function getActiveGroup(): string | null {
  return localStorage.getItem(ACTIVE_GROUP_KEY);
}