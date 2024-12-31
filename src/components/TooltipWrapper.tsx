import React from 'react';
import toast from 'react-hot-toast';

interface TooltipWrapperProps {
  children: React.ReactNode;
  tooltip: string;
}

export default function TooltipWrapper({ children, tooltip }: TooltipWrapperProps) {
  return (
    <div
      onMouseEnter={() => toast(tooltip, {
        duration: 2000,
        position: 'top-center',
        style: {
          background: 'rgba(229, 231, 235, 0.5)', // gray-200 with 50% opacity
          color: '#000000',
          padding: '12px',
          borderRadius: '8px',
          backdropFilter: 'blur(4px)',
        },
      })}
    >
      {children}
    </div>
  );
}