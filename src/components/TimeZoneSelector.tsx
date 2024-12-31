import React, { useState, useEffect } from 'react';
import { TimeZone, SavedTimeZone } from '../utils/conversionInterfaces';
import { getCurrentTime, getSavedTimeZones, saveTimeZone, removeTimeZone } from '../utils/timeZoneManager';
import Card from './Card';
import Button from './Button';

export default function TimeZoneSelector() {
  const [savedZones, setSavedZones] = useState<SavedTimeZone[]>([]);
  const [currentTimes, setCurrentTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    setSavedZones(getSavedTimeZones());
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateTimes = () => {
    const times: Record<string, string> = {};
    savedZones.forEach(zone => {
      times[zone.id] = getCurrentTime(zone.id);
    });
    setCurrentTimes(times);
  };

  const handleAddZone = (zone: TimeZone, label: string) => {
    try {
      const newZone: SavedTimeZone = { ...zone, label };
      saveTimeZone(newZone);
      setSavedZones(getSavedTimeZones());
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to save time zone');
    }
  };

  const handleRemoveZone = (id: string) => {
    removeTimeZone(id);
    setSavedZones(getSavedTimeZones());
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Saved Time Zones</h3>
      <div className="space-y-4">
        {savedZones.map(zone => (
          <div key={zone.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{zone.label}</p>
              <p className="text-sm text-gray-600">{zone.name}</p>
              <p className="text-lg">{currentTimes[zone.id]}</p>
            </div>
            <Button
              variant="secondary"
              onClick={() => handleRemoveZone(zone.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}