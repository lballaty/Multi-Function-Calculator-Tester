import { Point, GraphFunction } from './types';

export function generatePoints(
  fn: GraphFunction,
  variables: Record<string, number>,
  xMin: number,
  xMax: number,
  steps: number = 1000
): Point[] {
  const points: Point[] = [];
  const step = (xMax - xMin) / (steps - 1);

  for (let i = 0; i < steps; i++) {
    const x = xMin + i * step;
    try {
      const y = fn.generate(x, variables);
      if (isFinite(y) && Math.abs(y) <= 1000) {
        points.push({ x, y });
      }
    } catch (error) {
      continue;
    }
  }

  return points;
}