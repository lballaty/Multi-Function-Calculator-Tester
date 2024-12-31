export interface Tab {
  id: string;
  path: string;
  label: string;
  icon: string;
}

export interface TabGroup {
  id: string;
  name: string;
  tabs: string[]; // Array of tab IDs
  isDefault?: boolean;
}

export interface TabVisibilityState {
  hiddenTabs: boolean;
  activeGroupId: string | null;
  groups: TabGroup[];
}