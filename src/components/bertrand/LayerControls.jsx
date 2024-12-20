import React from 'react';

const LayerToggle = ({ enabled, onChange, children }) => (
  <label className="relative inline-flex items-center group p-2 w-full rounded-lg hover:bg-gray-700 cursor-pointer">
    <div className="relative inline-block h-6 w-11 flex-shrink-0">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={enabled}
        onChange={onChange}
      />
      <span className="absolute h-6 w-11 cursor-pointer rounded-full bg-gray-600 transition-colors duration-200 ease-in-out peer-checked:bg-blue-500" />
      <span className="absolute left-0.5 top-0.5 h-5 w-5 transform rounded-full bg-gray-300 shadow-md transition duration-200 ease-in-out peer-checked:translate-x-5" />
    </div>
    <span className="ml-3 text-sm font-medium text-gray-300 group-hover:text-gray-100">
      {children}
    </span>
  </label>
);

const LayerControls = ({ method, layers, onLayerToggle }) => {
  // Define which controls are available for each method
  const availableControls = {
    endpoints: ['chords', 'endpoints', 'midpoints', 'triangle'],
    radius: ['chords', 'radiusLines', 'midpoints', 'triangle'],
    midpoint: ['chords', 'midpoints', 'triangle']
  };

  const controlLabels = {
    chords: 'Show Chords',
    endpoints: 'Show Endpoints',
    midpoints: 'Show Midpoints',
    radiusLines: 'Show Radius Lines',
    triangle: 'Show Reference Triangle'
  };

  const controls = availableControls[method] || [];

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="font-medium text-gray-100 mb-4 pb-2 border-b border-gray-700">
        Visualization Controls
      </h3>
      <div className="space-y-1">
        {controls.map(key => (
          <LayerToggle
            key={key}
            enabled={layers[key]}
            onChange={() => onLayerToggle(key)}
          >
            {controlLabels[key]}
          </LayerToggle>
        ))}
      </div>
    </div>
  );
};

export default LayerControls;