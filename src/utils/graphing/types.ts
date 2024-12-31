export interface Point {
  x: number;
  y: number;
}

export interface GraphConfig {
  width: number;
  height: number;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  gridSize: number;
}

export interface GraphFunction {
  id: string;
  name: string;
  description: string;
  variables: Array<{
    name: string;
    label: string;
    defaultValue: number;
  }>;
  generate: (x: number, variables: Record<string, number>) => number;
}