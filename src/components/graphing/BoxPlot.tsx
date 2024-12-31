import React, { useEffect, useRef } from 'react';

interface BoxPlotProps {
  data: number[];
  width?: number;
  height?: number;
}

export function BoxPlot({ data, width = 600, height = 200 }: BoxPlotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate statistics
    const sorted = [...data].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const median = sorted[Math.floor(sorted.length * 0.5)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];

    // Calculate scale
    const padding = 40;
    const boxHeight = 50;
    const scale = (width - padding * 2) / (max - min);

    // Draw box
    ctx.fillStyle = '#3b82f6';
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2;

    // Draw whiskers
    const y = height / 2;
    
    // Left whisker
    ctx.beginPath();
    ctx.moveTo(padding + (min - min) * scale, y);
    ctx.lineTo(padding + (q1 - min) * scale, y);
    ctx.stroke();

    // Right whisker
    ctx.beginPath();
    ctx.moveTo(padding + (q3 - min) * scale, y);
    ctx.lineTo(padding + (max - min) * scale, y);
    ctx.stroke();

    // Box
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.fillRect(
      padding + (q1 - min) * scale,
      y - boxHeight / 2,
      (q3 - q1) * scale,
      boxHeight
    );
    ctx.strokeRect(
      padding + (q1 - min) * scale,
      y - boxHeight / 2,
      (q3 - q1) * scale,
      boxHeight
    );

    // Median line
    ctx.beginPath();
    ctx.moveTo(padding + (median - min) * scale, y - boxHeight / 2);
    ctx.lineTo(padding + (median - min) * scale, y + boxHeight / 2);
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = '#000000';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    
    ctx.fillText(min.toFixed(2), padding + (min - min) * scale, y + boxHeight);
    ctx.fillText(q1.toFixed(2), padding + (q1 - min) * scale, y + boxHeight);
    ctx.fillText(median.toFixed(2), padding + (median - min) * scale, y + boxHeight);
    ctx.fillText(q3.toFixed(2), padding + (q3 - min) * scale, y + boxHeight);
    ctx.fillText(max.toFixed(2), padding + (max - min) * scale, y + boxHeight);

  }, [data, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full border rounded bg-white"
    />
  );
}