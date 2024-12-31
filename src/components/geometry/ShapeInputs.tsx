import React from 'react';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

interface ShapeInputsProps {
  shape: string;
  dimensions: Record<string, string>;
  onChange: (dimensions: Record<string, string>) => void;
}

export function ShapeInputs({ shape, dimensions, onChange }: ShapeInputsProps) {
  const updateDimension = (key: string, value: string) => {
    onChange({ ...dimensions, [key]: value });
  };

  switch (shape) {
    case 'circle':
      return (
        <EnhancedTooltipWrapper tooltip="Enter the radius of the circle">
          <input
            type="number"
            value={dimensions.radius || ''}
            onChange={e => updateDimension('radius', e.target.value)}
            placeholder="Radius"
            className="w-full p-2 border rounded"
          />
        </EnhancedTooltipWrapper>
      );

    case 'rectangle':
      return (
        <div className="space-y-2">
          <EnhancedTooltipWrapper tooltip="Enter the width of the rectangle">
            <input
              type="number"
              value={dimensions.width || ''}
              onChange={e => updateDimension('width', e.target.value)}
              placeholder="Width"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
          <EnhancedTooltipWrapper tooltip="Enter the height of the rectangle">
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

    case 'triangle':
      return (
        <div className="space-y-2">
          <EnhancedTooltipWrapper tooltip="Enter the base of the triangle">
            <input
              type="number"
              value={dimensions.base || ''}
              onChange={e => updateDimension('base', e.target.value)}
              placeholder="Base"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
          <EnhancedTooltipWrapper tooltip="Enter the height of the triangle">
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

    case 'trapezoid':
      return (
        <div className="space-y-2">
          <EnhancedTooltipWrapper tooltip="Enter the length of parallel side a">
            <input
              type="number"
              value={dimensions.a || ''}
              onChange={e => updateDimension('a', e.target.value)}
              placeholder="Side a"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
          <EnhancedTooltipWrapper tooltip="Enter the length of parallel side b">
            <input
              type="number"
              value={dimensions.b || ''}
              onChange={e => updateDimension('b', e.target.value)}
              placeholder="Side b"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
          <EnhancedTooltipWrapper tooltip="Enter the height of the trapezoid">
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