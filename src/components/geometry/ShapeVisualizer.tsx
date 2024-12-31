import React from 'react';
import { useSettings } from '../../context/SettingsContext';

interface ShapeVisualizerProps {
  shape: string;
  dimensions: Record<string, string>;
  scale?: number;
}

export default function ShapeVisualizer({ shape, dimensions, scale = 100 }: ShapeVisualizerProps) {
  const { settings } = useSettings();
  const fontSize = settings.calculatorSize.fontSize;
  const strokeColor = '#3b82f6'; // Blue-500

  const renderShape = () => {
    switch (shape) {
      case 'circle':
        const radius = parseFloat(dimensions.radius) || 1;
        const scaledRadius = Math.min(radius * scale * 0.4, scale * 0.8);
        const centerX = scale;
        const centerY = scale;
        
        return (
          <svg width={scale * 2} height={scale * 2} className="mx-auto">
            {/* Grid */}
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r={scaledRadius}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
            />
            
            {/* Radius line */}
            <line
              x1={centerX}
              y1={centerY}
              x2={centerX + scaledRadius}
              y2={centerY}
              stroke={strokeColor}
              strokeWidth="1"
              strokeDasharray="4,4"
            />
            
            {/* Center point */}
            <circle
              cx={centerX}
              cy={centerY}
              r="3"
              fill={strokeColor}
            />
            
            {/* Radius label */}
            <text
              x={centerX + scaledRadius/2}
              y={centerY - 10}
              textAnchor="middle"
              fill="currentColor"
              className={fontSize}
            >
              r = {dimensions.radius}
            </text>
          </svg>
        );

      case 'triangle':
        const base = parseFloat(dimensions.base) || 1;
        const height = parseFloat(dimensions.height) || 1;
        const scaledBase = Math.min(base * scale * 0.4, scale * 1.4);
        const scaledHeight = Math.min(height * scale * 0.4, scale * 1.4);
        const startX = scale * 0.3;
        const startY = scale * 1.5;
        
        return (
          <svg width={scale * 2} height={scale * 2} className="mx-auto">
            {/* Grid */}
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Triangle */}
            <path
              d={`M ${startX},${startY} 
                  L ${startX + scaledBase},${startY} 
                  L ${startX},${startY - scaledHeight} Z`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
            />
            
            {/* Base label */}
            <text
              x={startX + scaledBase/2}
              y={startY + 20}
              textAnchor="middle"
              fill="currentColor"
              className={fontSize}
            >
              base = {dimensions.base}
            </text>
            
            {/* Height label */}
            <text
              x={startX - 10}
              y={startY - scaledHeight/2}
              textAnchor="end"
              fill="currentColor"
              className={fontSize}
            >
              height = {dimensions.height}
            </text>
            
            {/* Right angle marker */}
            <path
              d={`M ${startX + 15},${startY} 
                  L ${startX + 15},${startY - 15} 
                  L ${startX},${startY - 15}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
            />
            
            {/* Angles */}
            <text x={startX - 5} y={startY - 5} fill="currentColor" className={fontSize}>90°</text>
            <text x={startX - 5} y={startY - scaledHeight + 15} fill="currentColor" className={fontSize}>
              {Math.round(Math.atan(base/height) * (180/Math.PI))}°
            </text>
            <text x={startX + scaledBase + 5} y={startY - 5} fill="currentColor" className={fontSize}>
              {Math.round(Math.atan(height/base) * (180/Math.PI))}°
            </text>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className="border rounded p-4 bg-white">
      {renderShape()}
    </div>
  );
}