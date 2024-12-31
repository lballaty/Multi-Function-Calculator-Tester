import React, { useState } from 'react';
import { Calculator, Home, Ruler, Square, Binary, LineChart, Network, Globe, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SettingsModal from './SettingsModal';
import { useTabVisibility } from '../context/TabVisibilityContext';
import TabToggleButton from './TabToggleButton';

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/calculator', icon: Calculator, label: 'Calculator' },
  { path: '/conversions', icon: Ruler, label: 'Unit Conversions' },
  { path: '/geometry', icon: Square, label: 'Geometry' },
  { path: '/algebra', icon: Binary, label: 'Algebra' },
  { path: '/graphing', icon: LineChart, label: 'Graphing' },
  { path: '/ip-calculator', icon: Network, label: 'IP Calculator' },
  { path: '/api-tester', icon: Globe, label: 'API Tester' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { state } = useTabVisibility();

  return (
    <div className="min-h-screen">
      <nav 
        style={{ backgroundColor: 'var(--color-card)' }} 
        className={`shadow-md transition-all duration-300 ${
          state.hiddenTabs ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = location.pathname === tab.path;
                return (
                  <Link
                    key={tab.path}
                    to={tab.path}
                    className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium whitespace-nowrap ${
                      isActive ? 'nav-tab-active' : 'nav-tab'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <TabToggleButton />

      <main className={`max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        state.hiddenTabs ? 'mt-0' : 'mt-4'
      }`}>
        {children}
      </main>
      
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="fixed right-4 bottom-4 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        style={{ backgroundColor: 'var(--color-card)' }}
      >
        <Settings className="h-6 w-6" style={{ color: 'var(--color-text)' }} />
      </button>

      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
}