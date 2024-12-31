import { TimeZone, SavedTimeZone } from './conversionInterfaces';

const STORAGE_KEY = 'savedTimeZones';

export function getCurrentTime(timezone: string): string {
  return new Date().toLocaleTimeString('en-US', { timeZone: timezone });
}

export function getSavedTimeZones(): SavedTimeZone[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveTimeZone(timeZone: SavedTimeZone): void {
  const saved = getSavedTimeZones();
  if (saved.length >= 10) {
    throw new Error('Maximum of 10 time zones can be saved');
  }
  
  const updated = [...saved, timeZone];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function removeTimeZone(id: string): void {
  const saved = getSavedTimeZones();
  const updated = saved.filter(tz => tz.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}