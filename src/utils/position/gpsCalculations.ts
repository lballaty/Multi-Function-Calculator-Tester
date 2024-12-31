interface GeoPosition {
  latitude: number;
  longitude: number;
  elevation?: number;
}

interface Position3D {
  x: number;
  y: number;
  z: number;
}

const EARTH_RADIUS = 6371000; // meters

export function calculateDistance(pos1: GeoPosition, pos2: GeoPosition): number {
  const lat1 = toRadians(pos1.latitude);
  const lat2 = toRadians(pos2.latitude);
  const deltaLat = toRadians(pos2.latitude - pos1.latitude);
  const deltaLon = toRadians(pos2.longitude - pos1.longitude);

  const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
           Math.cos(lat1) * Math.cos(lat2) *
           Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = EARTH_RADIUS * c;

  // Include elevation if available
  if (pos1.elevation !== undefined && pos2.elevation !== undefined) {
    const elevDiff = pos2.elevation - pos1.elevation;
    return Math.sqrt(distance * distance + elevDiff * elevDiff);
  }

  return distance;
}

export function calculateBearing(pos1: GeoPosition, pos2: GeoPosition): number {
  const lat1 = toRadians(pos1.latitude);
  const lat2 = toRadians(pos2.latitude);
  const deltaLon = toRadians(pos2.longitude - pos1.longitude);

  const y = Math.sin(deltaLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) -
           Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
  
  return (toDegrees(Math.atan2(y, x)) + 360) % 360;
}

export function toCartesian(pos: GeoPosition): Position3D {
  const lat = toRadians(pos.latitude);
  const lon = toRadians(pos.longitude);
  const h = pos.elevation || 0;
  
  const r = EARTH_RADIUS + h;
  
  return {
    x: r * Math.cos(lat) * Math.cos(lon),
    y: r * Math.cos(lat) * Math.sin(lon),
    z: r * Math.sin(lat)
  };
}

export function toGeodetic(pos: Position3D): GeoPosition {
  const r = Math.sqrt(pos.x * pos.x + pos.y * pos.y + pos.z * pos.z);
  const elevation = r - EARTH_RADIUS;
  
  return {
    latitude: toDegrees(Math.asin(pos.z / r)),
    longitude: toDegrees(Math.atan2(pos.y, pos.x)),
    elevation
  };
}

function toRadians(degrees: number): number {
  return degrees * Math.PI / 180;
}

function toDegrees(radians: number): number {
  return radians * 180 / Math.PI;
}