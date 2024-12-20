import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import IntroScreen from './IntroScreen';
import CircleCanvas from './CircleCanvas';
import MethodSelector from './MethodSelector';
import StatsPanel from './StatsPanel';
import LayerControls from './LayerControls';
import Legend from './Legend';
import Explanation from './Explanation';
import {
  randomEndpointsMethod,
  randomRadiusMethod,
  randomMidpointMethod
} from './utils/bertrand-logic';

const Bertrand = () => {
  const [stage, setStage] = useState('intro'); // intro, interactive, explanation
  const [selectedMethod, setSelectedMethod] = useState('endpoints');
  const [chordHistory, setChordHistory] = useState([]);
  const [stats, setStats] = useState({ trials: 0, longerCount: 0 });
  const [isSimulating, setIsSimulating] = useState(false);
  const [layers, setLayers] = useState({
    chords: true,
    endpoints: true,
    midpoints: false,
    radiusLines: true,
    triangle: true
  });

  const radius = 150; // Fixed radius for consistency

  const generateChord = useCallback(() => {
    let newChord;
    switch (selectedMethod) {
      case 'endpoints':
        newChord = randomEndpointsMethod(radius);
        break;
      case 'radius':
        newChord = randomRadiusMethod(radius);
        break;
      case 'midpoint':
        newChord = randomMidpointMethod(radius);
        break;
      default:
        newChord = randomEndpointsMethod(radius);
    }

    setChordHistory(prev => [...prev, newChord]);
    setStats(prev => ({
      trials: prev.trials + 1,
      longerCount: prev.longerCount + (newChord.isLonger ? 1 : 0)
    }));

    return newChord.isLonger;
  }, [selectedMethod]);

  const runSimulation = async (count = 100) => {
    setIsSimulating(true);
    let longer = 0;
    
    for (let i = 0; i < count; i++) {
      const isLonger = generateChord();
      longer += isLonger ? 1 : 0;
      
      // Add a small delay every few iterations to keep UI responsive
      if (i % 5 === 0) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }
    
    setIsSimulating(false);
  };

  const resetStats = () => {
    setStats({ trials: 0, longerCount: 0 });
    setChordHistory([]);
  };

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    resetStats();
  };

  if (stage === 'intro') {
    return <IntroScreen onStart={() => setStage('interactive')} />;
  }

return (
    <div className="relative min-h-screen bg-gray-900 text-white py-8 px-4">
      <Link
        to="/"
        className="absolute top-4 left-4 text-white hover:text-blue-300 transition-colors z-50"
      >
        ← Back to Home
      </Link>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Bertrand's Paradox</h1>
          <p className="mt-2 text-gray-300">
            Explore how different definitions of "random" lead to different probabilities
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          {/* Method selection */}
          <MethodSelector
            selectedMethod={selectedMethod}
            onMethodChange={handleMethodChange}
          />

          {/* Controls and visualization container */}
          <div className="grid grid-cols-4 gap-6 mt-6">
            {/* Layer controls */}
            <div className="col-span-1">
              <LayerControls
                method={selectedMethod}
                layers={layers}
                onLayerToggle={(layer) => {
                  setLayers(prev => ({
                    ...prev,
                    [layer]: !prev[layer]
                  }));
                }}
              />
            </div>

            {/* Main visualization and legend */}
            <div className="col-span-3 space-y-4">
              <div className="bg-gray-700 rounded-lg shadow p-6">
                <CircleCanvas
                  radius={radius}
                  method={selectedMethod}
                  chordHistory={chordHistory}
                  layers={layers}
                />
              </div>
              <Legend />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={generateChord}
            disabled={isSimulating}
            className="inline-flex items-center px-4 py-2 border border-transparent
                     text-base font-medium rounded-md shadow-sm text-white
                     bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2
                     focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50
                     transition-colors"
          >
            Generate Chord
          </button>
          <button
            onClick={() => runSimulation(100)}
            disabled={isSimulating}
            className="inline-flex items-center px-4 py-2 border border-transparent
                     text-base font-medium rounded-md shadow-sm text-white
                     bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2
                     focus:ring-offset-2 focus:ring-green-400 disabled:opacity-50
                     transition-colors"
          >
            Run 100 Trials
          </button>
          <button
            onClick={resetStats}
            disabled={isSimulating}
            className="inline-flex items-center px-4 py-2 border border-gray-600
                     text-base font-medium rounded-md shadow-sm text-gray-200
                     bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2
                     focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50
                     transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Statistics */}
        <StatsPanel trials={stats.trials} longerCount={stats.longerCount} />

        {/* Explanation */}
        <div className="mt-8">
          <Explanation />
        </div>
      </div>
    </div>
  );
};

export default Bertrand;