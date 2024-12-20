import React from 'react';
import { getPointOnCircle, getTriangleSideLength } from './utils/bertrand-logic';

const CircleCanvas = ({ 
  radius = 150,
  method = 'endpoints',
  chordHistory = [],
  layers = {
    chords: true,
    endpoints: true,
    midpoints: true,
    radiusLines: true,
    triangle: true
  }
}) => {
  // Add padding to ensure the full circle fits
  const padding = 20;
  const size = (radius + padding) * 2;
  const center = size / 2;

  // Draw inscribed equilateral triangle
  const trianglePoints = layers.triangle ? Array.from({ length: 3 }, (_, i) => {
    const angle = (i * 2 * Math.PI) / 3;
    return getPointOnCircle(radius, angle);
  }) : [];

  return (
    <svg 
      width={size} 
      height={size} 
      className="mx-auto bg-slate-50 rounded-lg shadow-inner"
      viewBox={`0 0 ${size} ${size}`}
    >
      {/* Circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="black"
        strokeWidth="2"
      />

      {/* Inscribed equilateral triangle */}
      {layers.triangle && (
        <path
          d={`M ${trianglePoints.map(p => 
            `${p.x + center} ${p.y + center}`).join(' L ')} Z`}
          fill="none"
          stroke="gray"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
      )}

      {/* All chords with their associated elements */}
      {chordHistory.map((chord, index) => {
        const opacity = 0.3; // Uniform opacity for all chords
        
        return (
          <g key={index}>
            {/* Show radius line if applicable */}
            {layers.radiusLines && method === 'radius' && chord.radiusAngle !== undefined && (
              <line
                x1={center}
                y1={center}
                x2={center + radius * Math.cos(chord.radiusAngle)}
                y2={center + radius * Math.sin(chord.radiusAngle)}
                stroke="gray"
                strokeWidth="1"
                strokeDasharray="3,3"
                opacity={opacity}
              />
            )}

            {/* Show midpoint if applicable */}
            {layers.midpoints && chord.midpoint && (
              <circle
                cx={chord.midpoint.x + center}
                cy={chord.midpoint.y + center}
                r="2"
                fill="blue"
                opacity={opacity}
              />
            )}

            {/* Draw endpoint markers for endpoint method */}
            {layers.endpoints && method === 'endpoints' && (
              <>
                <circle
                  cx={chord.points[0].x + center}
                  cy={chord.points[0].y + center}
                  r="2"
                  fill={chord.isLonger ? "#22c55e" : "#ef4444"}
                  opacity={opacity}
                />
                <circle
                  cx={chord.points[1].x + center}
                  cy={chord.points[1].y + center}
                  r="2"
                  fill={chord.isLonger ? "#22c55e" : "#ef4444"}
                  opacity={opacity}
                />
              </>
            )}

            {/* Draw the chord */}
            {layers.chords && (
              <line
                x1={chord.points[0].x + center}
                y1={chord.points[0].y + center}
                x2={chord.points[1].x + center}
                y2={chord.points[1].y + center}
                stroke={chord.isLonger ? "#22c55e" : "#ef4444"}
                strokeWidth="1.5"
                opacity={opacity}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default CircleCanvas;