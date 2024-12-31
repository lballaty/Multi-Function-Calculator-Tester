import React from 'react';
import { useSettings } from '../../context/SettingsContext';

interface Shape3DVisualizerProps {
  shape: string;
  dimensions: Record<string, string>;
  scale?: number;
}

export default function Shape3DVisualizer({ shape, dimensions, scale = 100 }: Shape3DVisualizerProps) {
  const { settings } = useSettings();
  const fontSize = settings.calculatorSize.fontSize;
  const strokeColor = '#3b82f6';
  const dashedLine = '4,4';

  const renderShape = () => {
    switch (shape) {
      case 'cube':
        // ... existing cube rendering code ...

      case 'sphere':
        const radius = parseFloat(dimensions.radius) || 1;
        const scaledRadius = Math.min(radius * scale * 0.4, scale * 0.8);
        const centerX = scale;
        const centerY = scale;
        
        return (
          <svg width={scale * 2} height={scale * 2} className="mx-auto">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Main circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r={scaledRadius}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
            />
            
            {/* Horizontal ellipse */}
            <ellipse
              cx={centerX}
              cy={centerY}
              rx={scaledRadius}
              ry={scaledRadius * 0.4}
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
            />
            
            {/* Vertical ellipse */}
            <ellipse
              cx={centerX}
              cy={centerY}
              rx={scaledRadius * 0.4}
              ry={scaledRadius}
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
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

      case 'cylinder':
        const cylRadius = parseFloat(dimensions.radius) || 1;
        const cylHeight = parseFloat(dimensions.height) || 2;
        const scaledCylRadius = Math.min(cylRadius * scale * 0.3, scale * 0.6);
        const scaledCylHeight = Math.min(cylHeight * scale * 0.3, scale * 0.8);
        const cylStartX = scale * 0.5;
        const cylStartY = scale * 1.2;
        
        return (
          <svg width={scale * 2} height={scale * 2} className="mx-auto">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Bottom ellipse */}
            <ellipse
              cx={cylStartX + scaledCylRadius}
              cy={cylStartY}
              rx={scaledCylRadius}
              ry={scaledCylRadius * 0.4}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
            />
            
            {/* Vertical lines */}
            <line
              x1={cylStartX}
              y1={cylStartY - scaledCylRadius * 0.4}
              x2={cylStartX}
              y2={cylStartY - scaledCylHeight - scaledCylRadius * 0.4}
              stroke={strokeColor}
              strokeWidth="2"
            />
            <line
              x1={cylStartX + scaledCylRadius * 2}
              y1={cylStartY - scaledCylRadius * 0.4}
              x2={cylStartX + scaledCylRadius * 2}
              y2={cylStartY - scaledCylHeight - scaledCylRadius * 0.4}
              stroke={strokeColor}
              strokeWidth="2"
            />
            
            {/* Top ellipse */}
            <ellipse
              cx={cylStartX + scaledCylRadius}
              cy={cylStartY - scaledCylHeight}
              rx={scaledCylRadius}
              ry={scaledCylRadius * 0.4}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
            />
            
            {/* Labels */}
            <text
              x={cylStartX - 20}
              y={cylStartY - scaledCylHeight/2}
              textAnchor="end"
              fill="currentColor"
              className={fontSize}
            >
              h = {dimensions.height}
            </text>
            <text
              x={cylStartX + scaledCylRadius}
              y={cylStartY + 20}
              textAnchor="middle"
              fill="currentColor"
              className={fontSize}
            >
              r = {dimensions.radius}
            </text>
          </svg>
        );

      case 'cone':
        const coneRadius = parseFloat(dimensions.radius) || 1;
        const coneHeight = parseFloat(dimensions.height) || 2;
        const scaledConeRadius = Math.min(coneRadius * scale * 0.3, scale * 0.6);
        const scaledConeHeight = Math.min(coneHeight * scale * 0.3, scale * 0.8);
        const coneStartX = scale * 0.5;
        const coneStartY = scale * 1.2;
        
        return (
          <svg width={scale * 2} height={scale * 2} className="mx-auto">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Base ellipse */}
            <ellipse
              cx={coneStartX + scaledConeRadius}
              cy={coneStartY}
              rx={scaledConeRadius}
              ry={scaledConeRadius * 0.4}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
            />
            
            {/* Cone sides */}
            <line
              x1={coneStartX}
              y1={coneStartY - scaledConeRadius * 0.4}
              x2={coneStartX + scaledConeRadius}
              y2={coneStartY - scaledConeHeight}
              stroke={strokeColor}
              strokeWidth="2"
            />
            <line
              x1={coneStartX + scaledConeRadius * 2}
              y1={coneStartY - scaledConeRadius * 0.4}
              x2={coneStartX + scaledConeRadius}
              y2={coneStartY - scaledConeHeight}
              stroke={strokeColor}
              strokeWidth="2"
            />
            
            {/* Height line */}
            <line
              x1={coneStartX + scaledConeRadius}
              y1={coneStartY}
              x2={coneStartX + scaledConeRadius}
              y2={coneStartY - scaledConeHeight}
              stroke={strokeColor}
              strokeWidth="1"
              strokeDasharray={dashedLine}
            />
            
            {/* Labels */}
            <text
              x={coneStartX + scaledConeRadius - 20}
              y={coneStartY - scaledConeHeight/2}
              textAnchor="end"
              fill="currentColor"
              className={fontSize}
            >
              h = {dimensions.height}
            </text>
            <text
              x={coneStartX + scaledConeRadius}
              y={coneStartY + 20}
              textAnchor="middle"
              fill="currentColor"
              className={fontSize}
            >
              r = {dimensions.radius}
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