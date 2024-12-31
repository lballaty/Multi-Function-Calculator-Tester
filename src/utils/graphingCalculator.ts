import { Point, GraphConfig } from './graphingTypes';

export const DEFAULT_CONFIG: GraphConfig = {
  width: 600,
  height: 400,
  xMin: -10,
  xMax: 10,
  yMin: -10,
  yMax: 10,
  gridSize: 1
};

export function evaluateFunction(fn: string, x: number): number {
  try {
    // Create a safe function from the string
    const safeFunction = new Function('x', `return ${fn}`);
    return safeFunction(x);
  } catch (error) {
    throw new Error('Invalid function');
  }
}

export function generatePoints(fn: string, config: GraphConfig): Point[] {
  const points: Point[] = [];
  const step = (config.xMax - config.xMin) / config.width;

  for (let x = config.xMin; x <= config.xMax; x += step) {
    try {
      const y = evaluateFunction(fn, x);
      if (isFinite(y) && Math.abs(y) <= 1000) {
        points.push({ x, y });
      }
    } catch (error) {
      continue;
    }
  }

  return points;
}