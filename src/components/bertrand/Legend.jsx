import React from 'react';

const LegendItem = ({ color, children }) => (
  <div className="flex items-center space-x-2">
    <div 
      className="w-4 h-4 rounded"
      style={{ backgroundColor: color }}
    />
    <span className="text-sm text-gray-300">{children}</span>
  </div>
);

const Legend = () => (
  <div className="bg-gray-800 rounded-lg shadow-sm p-4">
    <h4 className="text-sm font-medium text-gray-100 mb-3">Result Legend</h4>
    <div className="space-y-2">
      <LegendItem color="#22c55e">
        Chord longer than triangle side
      </LegendItem>
      <LegendItem color="#ef4444">
        Chord shorter than triangle side
      </LegendItem>
    </div>
  </div>
);

export default Legend;