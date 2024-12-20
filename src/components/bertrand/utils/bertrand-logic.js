// Helper functions for geometric calculations
const TWO_PI = 2 * Math.PI;

export const getRandomAngle = () => Math.random() * TWO_PI;

export const getPointOnCircle = (radius, angle) => ({
  x: radius * Math.cos(angle),
  y: radius * Math.sin(angle)
});

// Calculate distance between two points
export const getDistance = (p1, p2) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Calculate the side length of inscribed equilateral triangle
export const getTriangleSideLength = (radius) => {
  return Math.sqrt(3) * radius;
};

// Method 1: Random Endpoints
export const randomEndpointsMethod = (radius) => {
  const angle1 = getRandomAngle();
  const angle2 = getRandomAngle();
  
  const point1 = getPointOnCircle(radius, angle1);
  const point2 = getPointOnCircle(radius, angle2);
  
  const length = getDistance(point1, point2);
  const threshold = getTriangleSideLength(radius);
  
  // Calculate midpoint for visualization
  const midpoint = {
    x: (point1.x + point2.x) / 2,
    y: (point1.y + point2.y) / 2
  };

  return {
    points: [point1, point2],
    midpoint,
    length,
    isLonger: length > threshold,
    threshold
  };
};

// Method 2: Random Radius and Point
export const randomRadiusMethod = (radius) => {
  // Choose random angle for radius line
  const radiusAngle = getRandomAngle();
  
  // Choose random point along radius (distance from center)
  const distance = Math.random() * radius;
  
  // Calculate midpoint of chord
  const midpoint = getPointOnCircle(distance, radiusAngle);
  
  // Calculate chord endpoints (perpendicular to radius)
  const perpAngle = radiusAngle + Math.PI / 2;
  const halfChordLength = Math.sqrt(radius * radius - distance * distance);
  
  const point1 = {
    x: midpoint.x + halfChordLength * Math.cos(perpAngle),
    y: midpoint.y + halfChordLength * Math.sin(perpAngle)
  };
  
  const point2 = {
    x: midpoint.x - halfChordLength * Math.cos(perpAngle),
    y: midpoint.y - halfChordLength * Math.sin(perpAngle)
  };
  
  const length = 2 * halfChordLength;
  const threshold = getTriangleSideLength(radius);
  
  return {
    points: [point1, point2],
    midpoint,
    radiusAngle,
    length,
    isLonger: length > threshold,
    threshold
  };
};

// Method 3: Random Midpoint
export const randomMidpointMethod = (radius) => {
  // Choose random point inside circle with proper area-weighted sampling
  const r = radius * Math.sqrt(Math.random()); // sqrt compensates for quadratic area growth
  const angle = getRandomAngle();
  
  // This is our midpoint
  const midpoint = getPointOnCircle(r, angle);
  
  // Calculate chord endpoints (perpendicular to radius)
  const radiusAngle = Math.atan2(midpoint.y, midpoint.x);
  const perpAngle = radiusAngle + Math.PI / 2;
  const halfChordLength = Math.sqrt(radius * radius - r * r);
  
  const point1 = {
    x: midpoint.x + halfChordLength * Math.cos(perpAngle),
    y: midpoint.y + halfChordLength * Math.sin(perpAngle)
  };
  
  const point2 = {
    x: midpoint.x - halfChordLength * Math.cos(perpAngle),
    y: midpoint.y - halfChordLength * Math.sin(perpAngle)
  };
  
  const length = 2 * halfChordLength;
  const threshold = getTriangleSideLength(radius);
  
  return {
    points: [point1, point2],
    midpoint,
    radiusAngle,
    length,
    isLonger: length > threshold,
    threshold
  };
};