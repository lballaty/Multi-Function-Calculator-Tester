export interface TriangleResult {
  area?: number;
  perimeter?: number;
  a?: number;
  b?: number;
  c?: number;
  angleA?: number;
  angleB?: number;
  angleC?: number;
}

export interface GeometryResult {
  area?: number;
  perimeter?: number;
  volume?: number;
  surfaceArea?: number;
  circumference?: number;
  diagonal?: number;
  sides?: {
    a?: number;
    b?: number;
    c?: number;
  };
  angles?: {
    A?: number;
    B?: number;
    C?: number;
  };
}