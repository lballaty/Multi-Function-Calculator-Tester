import { GraphConfig, Point } from './types';

export function drawGrid(ctx: CanvasRenderingContext2D, config: GraphConfig): void {
  const { width, height, xMin, xMax, yMin, yMax, gridSize } = config;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Draw grid lines
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;

  // Vertical grid lines
  for (let x = xMin; x <= xMax; x += gridSize) {
    const pixelX = ((x - xMin) / (xMax - xMin)) * width;
    ctx.beginPath();
    ctx.moveTo(pixelX, 0);
    ctx.lineTo(pixelX, height);
    ctx.stroke();
  }

  // Horizontal grid lines
  for (let y = yMin; y <= yMax; y += gridSize) {
    const pixelY = height - ((y - yMin) / (yMax - yMin)) * height;
    ctx.beginPath();
    ctx.moveTo(0, pixelY);
    ctx.lineTo(width, pixelY);
    ctx.stroke();
  }

  // Draw axes
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;

  // X-axis
  const yAxis = height - ((0 - yMin) / (yMax - yMin)) * height;
  ctx.beginPath();
  ctx.moveTo(0, yAxis);
  ctx.lineTo(width, yAxis);
  ctx.stroke();

  // Y-axis
  const xAxis = ((0 - xMin) / (xMax - xMin)) * width;
  ctx.beginPath();
  ctx.moveTo(xAxis, 0);
  ctx.lineTo(xAxis, height);
  ctx.stroke();
}

export function plotFunction(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  config: GraphConfig
): void {
  const { width, height, xMin, xMax, yMin, yMax } = config;

  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  ctx.beginPath();

  points.forEach((point, index) => {
    const x = ((point.x - xMin) / (xMax - xMin)) * width;
    const y = height - ((point.y - yMin) / (yMax - yMin)) * height;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
}