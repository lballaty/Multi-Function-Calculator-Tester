export interface ConversionCategory {
  [unit: string]: number;
}

export interface ConversionMap {
  [category: string]: ConversionCategory;
}

export interface TimeZone {
  id: string;
  name: string;
  offset: number;
  abbr: string;
}

export interface SavedTimeZone extends TimeZone {
  label: string;
}