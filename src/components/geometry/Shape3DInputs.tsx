import React from 'react';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

interface Shape3DInputsProps {
  shape: string;
  dimensions: Record<string, string>;
  onChange: (dimensions: Record<string, string>) => void;
}

export function Shape3DInputs({ shape, dimensions, onChange }: Shape3DInputsProps) {
  const updateDimension = (key: string, value: string) => {
    onChange({ ...dimensions, [key]: value });
  };

  switch (shape) {
    case 'cube':
      return (
        <EnhancedTooltipWrapper tooltip="Enter the side length of the cube">
          <input
            type="number"
            value={dimensions.side || ''}
            onChange={e => updateDimension('side', e.target.value)}
            placeholder="Side length"
            className="w-full p-2 border rounded"
          />
        </EnhancedTooltipWrapper>
      );

    case 'sphere':
      return (
        <EnhancedTooltipWrapper tooltip="Enter the radius of the sphere">
          <input
            type="number"
            value={dimensions.radius || ''}
            onChange={e => updateDimension('radius', e.target.value)}
            placeholder="Radius"
            className="w-full p-2 border rounded"
          />
        </EnhancedTooltipWrapper>
      );

    case 'cylinder':
    case 'cone':
      return (
        <div className="space-y-2">
          <EnhancedTooltipWrapper tooltip="Enter the radius">
            <input
              type="number"
              value={dimensions.radius || ''}
              onChange={e => updateDimension('radius', e.target.value)}
              placeholder="Radius"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
          <EnhancedTooltipWrapper tooltip="Enter the height">
            <input
              type="number"
              value={dimensions.height || ''}
              onChange={e => updateDimension('height', e.target.value)}
              placeholder="Height"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
        </div>
      );

    default:
      return null;
  }
}