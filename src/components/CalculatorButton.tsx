import React from 'react';
import { useSettings } from '../context/SettingsContext';

interface CalculatorButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'number' | 'operator' | 'action';
  children: React.ReactNode;
}

export default function CalculatorButton({ 
  variant = 'number',
  children,
  className = '',
  ...props 
}: CalculatorButtonProps) {
  const { settings } = useSettings();
  const { buttonPadding, buttonHeight } = settings.calculatorSize;

  const baseClasses = {
    number: 'bg-gray-100 hover:bg-gray-200',
    operator: 'bg-blue-100 hover:bg-blue-200',
    action: 'bg-blue-500 text-white hover:bg-blue-600'
  };

  return (
    <button
      className={`${buttonPadding} ${buttonHeight} rounded ${baseClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}