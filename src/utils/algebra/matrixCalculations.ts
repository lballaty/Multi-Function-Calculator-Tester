import { Matrix, Vector } from './types';

// Matrix Operations
export function addMatrices(a: Matrix, b: Matrix): Matrix {
  if (a.length !== b.length || a[0].length !== b[0].length) {
    throw new Error('Matrices must have the same dimensions');
  }
  return a.map((row, i) => row.map((val, j) => val + b[i][j]));
}

export function subtractMatrices(a: Matrix, b: Matrix): Matrix {
  if (a.length !== b.length || a[0].length !== b[0].length) {
    throw new Error('Matrices must have the same dimensions');
  }
  return a.map((row, i) => row.map((val, j) => val - b[i][j]));
}

export function multiplyMatrices(a: Matrix, b: Matrix): Matrix {
  if (a[0].length !== b.length) {
    throw new Error('Number of columns in first matrix must equal number of rows in second matrix');
  }
  
  const result: Matrix = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      result[i][j] = a[i].reduce((sum, val, k) => sum + val * b[k][j], 0);
    }
  }
  return result;
}

export function scalarMultiply(matrix: Matrix, scalar: number): Matrix {
  return matrix.map(row => row.map(val => val * scalar));
}

export function transpose(matrix: Matrix): Matrix {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

export function determinant(matrix: Matrix): number {
  if (matrix.length !== matrix[0].length) {
    throw new Error('Matrix must be square');
  }
  
  if (matrix.length === 1) return matrix[0][0];
  if (matrix.length === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }
  
  let det = 0;
  for (let i = 0; i < matrix[0].length; i++) {
    det += Math.pow(-1, i) * matrix[0][i] * determinant(minor(matrix, 0, i));
  }
  return det;
}

function minor(matrix: Matrix, row: number, col: number): Matrix {
  return matrix
    .filter((_, index) => index !== row)
    .map(row => row.filter((_, index) => index !== col));
}

// Vector Operations
export function addVectors(a: Vector, b: Vector): Vector {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length');
  }
  return a.map((val, i) => val + b[i]);
}

export function subtractVectors(a: Vector, b: Vector): Vector {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length');
  }
  return a.map((val, i) => val - b[i]);
}

export function dotProduct(a: Vector, b: Vector): number {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length');
  }
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

export function crossProduct(a: Vector, b: Vector): Vector {
  if (a.length !== 3 || b.length !== 3) {
    throw new Error('Cross product is only defined for 3D vectors');
  }
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

export function magnitude(vector: Vector): number {
  return Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
}

export function normalize(vector: Vector): Vector {
  const mag = magnitude(vector);
  return vector.map(val => val / mag);
}