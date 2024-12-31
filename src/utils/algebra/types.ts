export type Matrix = number[][];
export type Vector = number[];

export interface MatrixOperation {
  id: string;
  name: string;
  description: string;
  operation: (a: Matrix, b?: Matrix | number) => Matrix | number;
  requiresSecondMatrix?: boolean;
  requiresScalar?: boolean;
}

export interface VectorOperation {
  id: string;
  name: string;
  description: string;
  operation: (a: Vector, b?: Vector) => Vector | number;
  requiresSecondVector?: boolean;
  dimensions?: number;
}