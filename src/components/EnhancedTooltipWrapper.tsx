import React from 'react';
import toast from 'react-hot-toast';
import { useSettings } from '../context/SettingsContext';

interface TooltipWrapperProps {
  children: React.ReactNode;
  tooltip: string;
}

export default function EnhancedTooltipWrapper({ children, tooltip }: TooltipWrapperProps) {
  const { settings } = useSettings();

  const handleMouseEnter = () => {
    if (settings.tooltipsEnabled) {
      toast(tooltip, {
        duration: 2000,
        position: 'top-center',
        style: {
          background: `${settings.customColors.background}80`, // 80 is for 50% opacity
          color: settings.customColors.text,
          padding: '12px',
          borderRadius: '8px',
          backdropFilter: 'blur(4px)',
          border: `1px solid ${settings.customColors.secondary}40`, // 40 is for 25% opacity
        },
      });
    }
  };

  return (
    <div onMouseEnter={handleMouseEnter}>
      {children}
    </div>
  );
}