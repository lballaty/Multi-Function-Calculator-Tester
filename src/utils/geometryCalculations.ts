import { GeometryResult } from './geometryTypes';

// 2D Shape Calculations
export const calculateCircle = (radius: number): GeometryResult => ({
  area: Math.PI * radius * radius,
  circumference: 2 * Math.PI * radius
});

export const calculateRectangle = (width: number, height: number): GeometryResult => ({
  area: width * height,
  perimeter: 2 * (width + height),
  diagonal: Math.sqrt(width * width + height * height)
});

export const calculateTriangle = (base: number, height: number, hypotenuse?: number): GeometryResult => {
  const area = (base * height) / 2;
  
  // Calculate missing side using Pythagorean theorem if not provided
  const c = hypotenuse || Math.sqrt(base * base + height * height);
  
  return {
    area,
    perimeter: base + height + c,
    hypotenuse: c,
    base,
    height,
    // Add angles in degrees
    angleA: Math.atan(height / base) * (180 / Math.PI),
    angleB: Math.atan(base / height) * (180 / Math.PI),
    angleC: 90 // Right angle
  };
};

export const calculateTrapezoid = (a: number, b: number, height: number): GeometryResult => ({
  area: ((a + b) * height) / 2,
  perimeter: a + b + 2 * Math.sqrt(height * height + Math.pow((b - a) / 2, 2))
});

// 3D Shape Calculations
export const calculateCube = (side: number): GeometryResult => ({
  volume: Math.pow(side, 3),
  surfaceArea: 6 * Math.pow(side, 2),
  diagonal: side * Math.sqrt(3)
});

export const calculateSphere = (radius: number): GeometryResult => ({
  volume: (4/3) * Math.PI * Math.pow(radius, 3),
  surfaceArea: 4 * Math.PI * Math.pow(radius, 2),
  circumference: 2 * Math.PI * radius
});

export const calculateCylinder = (radius: number, height: number): GeometryResult => ({
  volume: Math.PI * Math.pow(radius, 2) * height,
  surfaceArea: 2 * Math.PI * radius * (radius + height),
  lateralSurfaceArea: 2 * Math.PI * radius * height,
  baseArea: Math.PI * Math.pow(radius, 2)
});

export const calculateCone = (radius: number, height: number): GeometryResult => {
  const slantHeight = Math.sqrt(Math.pow(radius, 2) + Math.pow(height, 2));
  return {
    volume: (1/3) * Math.PI * Math.pow(radius, 2) * height,
    surfaceArea: Math.PI * radius * (radius + slantHeight),
    lateralSurfaceArea: Math.PI * radius * slantHeight,
    baseArea: Math.PI * Math.pow(radius, 2),
    slantHeight
  };
};