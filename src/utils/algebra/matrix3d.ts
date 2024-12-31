// 3D Matrix operations
export type Matrix3D = number[][][];

export function create3DMatrix(x: number, y: number, z: number, defaultValue = 0): Matrix3D {
  return Array(x).fill(0).map(() => 
    Array(y).fill(0).map(() => 
      Array(z).fill(defaultValue)
    )
  );
}

export function add3DMatrices(a: Matrix3D, b: Matrix3D): Matrix3D {
  if (a.length !== b.length || a[0].length !== b[0].length || a[0][0].length !== b[0][0].length) {
    throw new Error('Matrices must have the same dimensions');
  }
  
  return a.map((plane, i) =>
    plane.map((row, j) =>
      row.map((val, k) => val + b[i][j][k])
    )
  );
}

export function multiply3DMatrices(a: Matrix3D, b: Matrix3D): Matrix3D {
  if (a[0][0].length !== b.length) {
    throw new Error('Invalid dimensions for multiplication');
  }
  
  const result = create3DMatrix(a.length, a[0].length, b[0][0].length);
  
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[0].length; j++) {
      for (let k = 0; k < b[0][0].length; k++) {
        let sum = 0;
        for (let l = 0; l < a[0][0].length; l++) {
          sum += a[i][j][l] * b[l][j][k];
        }
        result[i][j][k] = sum;
      }
    }
  }
  
  return result;
}

export function rotate3DMatrix(matrix: Matrix3D, axis: 'x' | 'y' | 'z', angle: number): Matrix3D {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  
  const rotationMatrix = create3DMatrix(3, 3, 3);
  
  switch (axis) {
    case 'x':
      rotationMatrix[0][0] = [1, 0, 0];
      rotationMatrix[1][1] = [0, cos, -sin];
      rotationMatrix[2][2] = [0, sin, cos];
      break;
    case 'y':
      rotationMatrix[0][0] = [cos, 0, sin];
      rotationMatrix[1][1] = [0, 1, 0];
      rotationMatrix[2][2] = [-sin, 0, cos];
      break;
    case 'z':
      rotationMatrix[0][0] = [cos, -sin, 0];
      rotationMatrix[1][1] = [sin, cos, 0];
      rotationMatrix[2][2] = [0, 0, 1];
      break;
  }
  
  return multiply3DMatrices(matrix, rotationMatrix);
}