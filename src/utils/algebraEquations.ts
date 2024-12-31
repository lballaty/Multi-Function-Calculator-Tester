export interface AlgebraicEquation {
  id: string;
  name: string;
  description: string;
  formula: string;
  variables: Array<{
    name: string;
    label: string;
    unit?: string;
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
  }>;
  calculate: (variables: Record<string, number>) => number | Record<string, number>;
}

export const equations: AlgebraicEquation[] = [
  {
    id: 'quadratic',
    name: 'Quadratic Formula',
    description: 'Solves ax² + bx + c = 0 for x',
    formula: 'x = (-b ± √(b² - 4ac)) / (2a)',
    variables: [
      { name: 'a', label: 'Coefficient a', placeholder: 'Enter a (≠ 0)' },
      { name: 'b', label: 'Coefficient b' },
      { name: 'c', label: 'Coefficient c' }
    ],
    calculate: ({ a, b, c }) => {
      if (a === 0) throw new Error('Coefficient a cannot be zero');
      const discriminant = b * b - 4 * a * c;
      if (discriminant < 0) throw new Error('No real solutions (complex roots)');
      
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      
      return x1 === x2 ? { x: x1 } : { x1, x2 };
    }
  },
  {
    id: 'linear',
    name: 'Linear Equation',
    description: 'Solves mx + b = y for x',
    formula: 'x = (y - b) / m',
    variables: [
      { name: 'm', label: 'Slope (m)', placeholder: 'Enter slope (≠ 0)' },
      { name: 'b', label: 'Y-intercept (b)' },
      { name: 'y', label: 'Y value' }
    ],
    calculate: ({ m, b, y }) => {
      if (m === 0) throw new Error('Slope cannot be zero');
      return { x: (y - b) / m };
    }
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest',
    description: 'Calculates final amount with compound interest',
    formula: 'A = P(1 + r/n)^(nt)',
    variables: [
      { name: 'p', label: 'Principal', unit: '$', min: 0, step: 0.01 },
      { name: 'r', label: 'Annual Rate', unit: '%', min: 0, max: 100, step: 0.01 },
      { name: 'n', label: 'Compounds per Year', min: 1, step: 1 },
      { name: 't', label: 'Time', unit: 'years', min: 0, step: 0.25 }
    ],
    calculate: ({ p, r, n, t }) => {
      if (p < 0) throw new Error('Principal cannot be negative');
      if (n <= 0) throw new Error('Compounds per year must be positive');
      if (t < 0) throw new Error('Time cannot be negative');
      
      const rate = r / 100;
      const amount = p * Math.pow(1 + rate/n, n * t);
      return {
        amount: Number(amount.toFixed(2)),
        interest: Number((amount - p).toFixed(2))
      };
    }
  },
  {
    id: 'exponential',
    name: 'Exponential Growth/Decay',
    description: 'Calculates exponential growth or decay over time',
    formula: 'A = A₀e^(rt)',
    variables: [
      { name: 'a0', label: 'Initial Amount', min: 0, step: 0.01 },
      { name: 'r', label: 'Rate', unit: '%/time', step: 0.01 },
      { name: 't', label: 'Time', unit: 'units', min: 0, step: 0.1 }
    ],
    calculate: ({ a0, r, t }) => {
      const rate = r / 100;
      const final = a0 * Math.exp(rate * t);
      return {
        final: Number(final.toFixed(2)),
        change: Number((final - a0).toFixed(2))
      };
    }
  },
  {
    id: 'pythagoras',
    name: 'Pythagorean Theorem',
    description: 'Calculates the length of a right triangle side',
    formula: 'a² + b² = c²',
    variables: [
      { name: 'a', label: 'Side a', min: 0, step: 0.1 },
      { name: 'b', label: 'Side b', min: 0, step: 0.1 }
    ],
    calculate: ({ a, b }) => {
      return { c: Math.sqrt(a * a + b * b) };
    }
  },
  {
    id: 'distance',
    name: 'Distance Formula',
    description: 'Calculates distance between two points',
    formula: 'd = √((x₂-x₁)² + (y₂-y₁)²)',
    variables: [
      { name: 'x1', label: 'x₁', placeholder: 'First x coordinate' },
      { name: 'y1', label: 'y₁', placeholder: 'First y coordinate' },
      { name: 'x2', label: 'x₂', placeholder: 'Second x coordinate' },
      { name: 'y2', label: 'y₂', placeholder: 'Second y coordinate' }
    ],
    calculate: ({ x1, y1, x2, y2 }) => {
      return { distance: Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) };
    }
  },
  {
    id: 'midpoint',
    name: 'Midpoint Formula',
    description: 'Calculates the midpoint between two points',
    formula: '(x,y) = ((x₁+x₂)/2, (y₁+y₂)/2)',
    variables: [
      { name: 'x1', label: 'x₁', placeholder: 'First x coordinate' },
      { name: 'y1', label: 'y₁', placeholder: 'First y coordinate' },
      { name: 'x2', label: 'x₂', placeholder: 'Second x coordinate' },
      { name: 'y2', label: 'y₂', placeholder: 'Second y coordinate' }
    ],
    calculate: ({ x1, y1, x2, y2 }) => {
      return {
        x: (x1 + x2) / 2,
        y: (y1 + y2) / 2
      };
    }
  },
  {
    id: 'slope',
    name: 'Slope Formula',
    description: 'Calculates the slope between two points',
    formula: 'm = (y₂-y₁)/(x₂-x₁)',
    variables: [
      { name: 'x1', label: 'x₁', placeholder: 'First x coordinate' },
      { name: 'y1', label: 'y₁', placeholder: 'First y coordinate' },
      { name: 'x2', label: 'x₂', placeholder: 'Second x coordinate' },
      { name: 'y2', label: 'y₂', placeholder: 'Second y coordinate' }
    ],
    calculate: ({ x1, y1, x2, y2 }) => {
      if (x2 - x1 === 0) throw new Error('Undefined slope (vertical line)');
      return { slope: (y2 - y1) / (x2 - x1) };
    }
  },
  {
    id: 'simple-interest',
    name: 'Simple Interest',
    description: 'Calculates simple interest over time',
    formula: 'I = P × r × t',
    variables: [
      { name: 'p', label: 'Principal', unit: '$', min: 0, step: 0.01 },
      { name: 'r', label: 'Annual Rate', unit: '%', min: 0, max: 100, step: 0.01 },
      { name: 't', label: 'Time', unit: 'years', min: 0, step: 0.25 }
    ],
    calculate: ({ p, r, t }) => {
      const rate = r / 100;
      const interest = p * rate * t;
      return {
        interest: Number(interest.toFixed(2)),
        total: Number((p + interest).toFixed(2))
      };
    }
  },
  {
    id: 'circle-area',
    name: 'Circle Area',
    description: 'Calculates area and circumference of a circle',
    formula: 'A = πr²',
    variables: [
      { name: 'r', label: 'Radius', min: 0, step: 0.1 }
    ],
    calculate: ({ r }) => {
      return {
        area: Number((Math.PI * r * r).toFixed(4)),
        circumference: Number((2 * Math.PI * r).toFixed(4))
      };
    }
  }
];