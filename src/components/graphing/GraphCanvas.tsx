import React, { useEffect, useRef } from 'react';
import { GraphFunction } from '../../utils/graphing/types';
import { drawGrid, plotFunction } from '../../utils/graphing/renderer';
import { generatePoints } from '../../utils/graphing/generator';

interface GraphCanvasProps {
  selectedFunction: GraphFunction;
  variables: Record<string, number>;
  width?: number;
  height?: number;
  onError?: (error: string | null) => void;
}

export default function GraphCanvas({
  selectedFunction,
  variables,
  width = 600,
  height = 400,
  onError
}: GraphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const config = {
        width,
        height,
        xMin: -10,
        xMax: 10,
        yMin: -10,
        yMax: 10,
        gridSize: 1
      };

      // Draw grid
      drawGrid(ctx, config);

      // Generate and plot points
      const points = generatePoints(selectedFunction, variables, config.xMin, config.xMax);
      plotFunction(ctx, points, config);

      onError?.(null);
    } catch (err) {
      onError?.('Error plotting function');
    }
  }, [selectedFunction, variables, width, height, onError]);

  return (
    <div className="border rounded p-4 bg-white">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full"
      />
    </div>
  );
}