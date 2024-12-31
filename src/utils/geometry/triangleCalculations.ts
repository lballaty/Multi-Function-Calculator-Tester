import { TriangleResult } from './types';

// Calculate angles using the law of sines and cosines
export function calculateTriangleAngles(a: number, b: number, c: number): { 
  angleA: number, 
  angleB: number, 
  angleC: number 
} {
  // Using law of cosines: cos(A) = (b² + c² - a²) / (2bc)
  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  const cosB = (a * a + c * c - b * b) / (2 * a * c);
  const cosC = (a * a + b * b - c * c) / (2 * a * b);

  return {
    angleA: Math.acos(cosA) * (180 / Math.PI),
    angleB: Math.acos(cosB) * (180 / Math.PI),
    angleC: Math.acos(cosC) * (180 / Math.PI)
  };
}

// Calculate missing side using law of sines
export function calculateMissingSide(knownSide: number, knownAngle: number, targetAngle: number): number {
  const radKnownAngle = knownAngle * (Math.PI / 180);
  const radTargetAngle = targetAngle * (Math.PI / 180);
  return (knownSide * Math.sin(radTargetAngle)) / Math.sin(radKnownAngle);
}

export function calculateTriangle(sides: {
  a?: number;
  b?: number;
  c?: number;
  angleA?: number;
  angleB?: number;
  angleC?: number;
}): TriangleResult {
  const { a, b, c, angleA, angleB, angleC } = sides;
  let result: TriangleResult = {};

  // Case 1: Three sides given (SSS)
  if (a && b && c) {
    const s = (a + b + c) / 2; // Semi-perimeter
    result = {
      area: Math.sqrt(s * (s - a) * (s - b) * (s - c)),
      perimeter: a + b + c,
      ...calculateTriangleAngles(a, b, c)
    };
  }
  // Case 2: Two sides and included angle (SAS)
  else if (a && b && angleC) {
    const radC = angleC * (Math.PI / 180);
    result = {
      area: 0.5 * a * b * Math.sin(radC),
      c: Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(radC))
    };
    result = {
      ...result,
      perimeter: a + b + result.c,
      ...calculateTriangleAngles(a, b, result.c)
    };
  }
  // Case 3: Two angles and one side (AAS or ASA)
  else if (a && angleA && angleB) {
    const angleC = 180 - angleA - angleB;
    const b = calculateMissingSide(a, angleA, angleB);
    const c = calculateMissingSide(a, angleA, angleC);
    result = {
      b,
      c,
      angleC,
      area: 0.5 * b * c * Math.sin(angleA * Math.PI / 180),
      perimeter: a + b + c
    };
  }

  return result;
}