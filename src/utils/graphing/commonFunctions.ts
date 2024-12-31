import { GraphFunction } from './types';

export const commonFunctions: GraphFunction[] = [
  {
    id: 'linear',
    name: 'Linear Function',
    description: 'y = mx + b',
    variables: [
      { name: 'm', label: 'Slope (m)', defaultValue: 1 },
      { name: 'b', label: 'Y-intercept (b)', defaultValue: 0 }
    ],
    generate: (x, vars) => vars.m * x + vars.b
  },
  {
    id: 'quadratic',
    name: 'Quadratic Function',
    description: 'y = ax² + bx + c',
    variables: [
      { name: 'a', label: 'a', defaultValue: 1 },
      { name: 'b', label: 'b', defaultValue: 0 },
      { name: 'c', label: 'c', defaultValue: 0 }
    ],
    generate: (x, vars) => vars.a * x * x + vars.b * x + vars.c
  },
  {
    id: 'cubic',
    name: 'Cubic Function',
    description: 'y = ax³ + bx² + cx + d',
    variables: [
      { name: 'a', label: 'a', defaultValue: 1 },
      { name: 'b', label: 'b', defaultValue: 0 },
      { name: 'c', label: 'c', defaultValue: 0 },
      { name: 'd', label: 'd', defaultValue: 0 }
    ],
    generate: (x, vars) => vars.a * x * x * x + vars.b * x * x + vars.c * x + vars.d
  },
  {
    id: 'exponential',
    name: 'Exponential Function',
    description: 'y = a(b^x)',
    variables: [
      { name: 'a', label: 'a', defaultValue: 1 },
      { name: 'b', label: 'Base (b)', defaultValue: 2 }
    ],
    generate: (x, vars) => vars.a * Math.pow(vars.b, x)
  },
  {
    id: 'logarithmic',
    name: 'Logarithmic Function',
    description: 'y = a * log_b(x)',
    variables: [
      { name: 'a', label: 'a', defaultValue: 1 },
      { name: 'b', label: 'Base (b)', defaultValue: Math.E }
    ],
    generate: (x, vars) => x <= 0 ? NaN : vars.a * Math.log(x) / Math.log(vars.b)
  },
  {
    id: 'sine',
    name: 'Sine Function',
    description: 'y = a * sin(bx + c) + d',
    variables: [
      { name: 'a', label: 'Amplitude (a)', defaultValue: 1 },
      { name: 'b', label: 'Frequency (b)', defaultValue: 1 },
      { name: 'c', label: 'Phase Shift (c)', defaultValue: 0 },
      { name: 'd', label: 'Vertical Shift (d)', defaultValue: 0 }
    ],
    generate: (x, vars) => vars.a * Math.sin(vars.b * x + vars.c) + vars.d
  },
  {
    id: 'cosine',
    name: 'Cosine Function',
    description: 'y = a * cos(bx + c) + d',
    variables: [
      { name: 'a', label: 'Amplitude (a)', defaultValue: 1 },
      { name: 'b', label: 'Frequency (b)', defaultValue: 1 },
      { name: 'c', label: 'Phase Shift (c)', defaultValue: 0 },
      { name: 'd', label: 'Vertical Shift (d)', defaultValue: 0 }
    ],
    generate: (x, vars) => vars.a * Math.cos(vars.b * x + vars.c) + vars.d
  }
];