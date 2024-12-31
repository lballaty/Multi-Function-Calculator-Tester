import { GeometryResult } from './types';

export const calculateCircle = (radius: number): GeometryResult => ({
  area: Math.PI * radius * radius,
  circumference: 2 * Math.PI * radius,
  radius
});

export const calculateRectangle = (width: number, height: number): GeometryResult => ({
  area: width * height,
  perimeter: 2 * (width + height),
  diagonal: Math.sqrt(width * width + height * height),
  width,
  height
});

export const calculateTriangle = (base: number, height: number): GeometryResult => {
  const hypotenuse = Math.sqrt(base * base + height * height);
  const angleA = Math.atan(height / base) * (180 / Math.PI);
  const angleB = 90 - angleA;
  
  return {
    area: (base * height) / 2,
    perimeter: base + height + hypotenuse,
    hypotenuse,
    base,
    height,
    angles: {
      A: angleA,
      B: angleB,
      C: 90
    }
  };
};

export const calculateTrapezoid = (a: number, b: number, height: number): GeometryResult => {
  const legLength = Math.sqrt(height * height + Math.pow((b - a) / 2, 2));
  return {
    area: ((a + b) * height) / 2,
    perimeter: a + b + 2 * legLength,
    height,
    sides: { a, b },
    legLength
  };
};

// 3D Shape Calculations
export const calculateCube = (side: number): GeometryResult => ({
  volume: Math.pow(side, 3),
  surfaceArea: 6 * Math.pow(side, 2),
  diagonal: side * Math.sqrt(3),
  side
});

export const calculateSphere = (radius: number): GeometryResult => ({
  volume: (4/3) * Math.PI * Math.pow(radius, 3),
  surfaceArea: 4 * Math.PI * Math.pow(radius, 2),
  radius
});

export const calculateCylinder = (radius: number, height: number): GeometryResult => ({
  volume: Math.PI * Math.pow(radius, 2) * height,
  surfaceArea: 2 * Math.PI * radius * (radius + height),
  lateralSurfaceArea: 2 * Math.PI * radius * height,
  baseArea: Math.PI * Math.pow(radius, 2),
  radius,
  height
});

export const calculateCone = (radius: number, height: number): GeometryResult => {
  const slantHeight = Math.sqrt(Math.pow(radius, 2) + Math.pow(height, 2));
  return {
    volume: (1/3) * Math.PI * Math.pow(radius, 2) * height,
    surfaceArea: Math.PI * radius * (radius + slantHeight),
    lateralSurfaceArea: Math.PI * radius * slantHeight,
    baseArea: Math.PI * Math.pow(radius, 2),
    slantHeight,
    radius,
    height
  };
};