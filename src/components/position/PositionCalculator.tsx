import React, { useState } from 'react';
import { calculateDistance, calculateBearing, toCartesian, toGeodetic } from '../../utils/position/gpsCalculations';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

interface Position {
  latitude: number;
  longitude: number;
  elevation?: number;
}

export default function PositionCalculator() {
  const [pos1, setPos1] = useState<Position>({ latitude: 0, longitude: 0 });
  const [pos2, setPos2] = useState<Position>({ latitude: 0, longitude: 0 });
  const [result, setResult] = useState<{
    distance?: number;
    bearing?: number;
    cartesian?: { x: number; y: number; z: number };
  }>({});

  const calculate = () => {
    const distance = calculateDistance(pos1, pos2);
    const bearing = calculateBearing(pos1, pos2);
    const cartesian = toCartesian(pos1);
    
    setResult({ distance, bearing, cartesian });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Position Calculator</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Position 1 */}
        <div className="space-y-4">
          <h4 className="font-medium">Position 1</h4>
          <EnhancedTooltipWrapper tooltip="Enter latitude in degrees">
            <input
              type="number"
              value={pos1.latitude}
              onChange={(e) => setPos1({ ...pos1, latitude: Number(e.target.value) })}
              placeholder="Latitude"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
          <EnhancedTooltipWrapper tooltip="Enter longitude in degrees">
            <input
              type="number"
              value={pos1.longitude}
              onChange={(e) => setPos1({ ...pos1, longitude: Number(e.target.value) })}
              placeholder="Longitude"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
          <EnhancedTooltipWrapper tooltip="Enter elevation in meters">
            <input
              type="number"
              value={pos1.elevation}
              onChange={(e) => setPos1({ ...pos1, elevation: Number(e.target.value) })}
              placeholder="Elevation (meters)"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
        </div>

        {/* Position 2 */}
        <div className="space-y-4">
          <h4 className="font-medium">Position 2</h4>
          <EnhancedTooltipWrapper tooltip="Enter latitude in degrees">
            <input
              type="number"
              value={pos2.latitude}
              onChange={(e) => setPos2({ ...pos2, latitude: Number(e.target.value) })}
              placeholder="Latitude"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
          <EnhancedTooltipWrapper tooltip="Enter longitude in degrees">
            <input
              type="number"
              value={pos2.longitude}
              onChange={(e) => setPos2({ ...pos2, longitude: Number(e.target.value) })}
              placeholder="Longitude"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
          <EnhancedTooltipWrapper tooltip="Enter elevation in meters">
            <input
              type="number"
              value={pos2.elevation}
              onChange={(e) => setPos2({ ...pos2, elevation: Number(e.target.value) })}
              placeholder="Elevation (meters)"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {result.distance !== undefined && (
        <div className="p-4 bg-gray-50 rounded space-y-2">
          <p>Distance: {(result.distance / 1000).toFixed(2)} km</p>
          <p>Bearing: {result.bearing?.toFixed(2)}°</p>
          {result.cartesian && (
            <div>
              <p className="font-medium">Cartesian coordinates (Position 1):</p>
              <p>X: {result.cartesian.x.toFixed(2)} m</p>
              <p>Y: {result.cartesian.y.toFixed(2)} m</p>
              <p>Z: {result.cartesian.z.toFixed(2)} m</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}