import React, { useEffect, useRef } from 'react';
import { createHistogramData } from '../../utils/graphing/statistics';

interface HistogramCanvasProps {
  data: number[];
  width?: number;
  height?: number;
  bins?: number;
}

export default function HistogramCanvas({
  data,
  width = 600,
  height = 400,
  bins = 10
}: HistogramCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Create histogram data
    const histogramData = createHistogramData(data, bins);
    const maxCount = Math.max(...histogramData.map(bin => bin.count));

    // Calculate bar width and scaling
    const barWidth = width / bins;
    const scale = (height - 40) / maxCount;

    // Draw bars
    ctx.fillStyle = '#3b82f6';
    histogramData.forEach((bin, i) => {
      const barHeight = bin.count * scale;
      ctx.fillRect(
        i * barWidth,
        height - barHeight - 20,
        barWidth - 1,
        barHeight
      );
    });

    // Draw axes
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(0, height - 20);
    ctx.lineTo(width, height - 20);
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = '#000000';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    
    // X-axis labels
    histogramData.forEach((bin, i) => {
      const x = i * barWidth + barWidth / 2;
      ctx.fillText(
        bin.start.toFixed(1),
        x,
        height - 5
      );
    });

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= maxCount; i += Math.ceil(maxCount / 5)) {
      const y = height - 20 - (i * scale);
      ctx.fillText(i.toString(), 25, y);
    }
  }, [data, width, height, bins]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full border rounded bg-white"
    />
  );
}