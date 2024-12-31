import { ConversionCategory } from './conversionInterfaces';

export const conversions = {
  length: {
    meters: 1,
    kilometers: 0.001,
    feet: 3.28084,
    miles: 0.000621371,
    inches: 39.3701,
    yards: 1.09361,
  },
  area: {
    'square meters': 1,
    'square kilometers': 0.000001,
    'square feet': 10.7639,
    'square miles': 3.861e-7,
    acres: 0.000247105,
    hectares: 0.0001,
  },
  energy: {
    joules: 1,
    calories: 0.239006,
    kilocalories: 0.000239006,
    'kilowatt-hours': 2.777778e-7,
    'british thermal units': 0.000947817,
  },
  power: {
    watts: 1,
    kilowatts: 0.001,
    horsepower: 0.00134102,
    'foot-pounds/minute': 44.2537,
  },
  pressure: {
    pascal: 1,
    bar: 0.00001,
    psi: 0.000145038,
    atmosphere: 9.86923e-6,
    torr: 0.00750062,
  },
  speed: {
    'meters/second': 1,
    'kilometers/hour': 3.6,
    'miles/hour': 2.23694,
    knots: 1.94384,
    'feet/second': 3.28084,
  },
  volume: {
    liters: 1,
    'cubic meters': 0.001,
    gallons: 0.264172,
    quarts: 1.05669,
    'cubic feet': 0.0353147,
    'cubic inches': 61.0237,
  },
  weight: {
    kilograms: 1,
    grams: 1000,
    pounds: 2.20462,
    ounces: 35.274,
    'metric tons': 0.001,
    stones: 0.157473,
  }
};