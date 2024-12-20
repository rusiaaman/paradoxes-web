import React from 'react';

const StatsPanel = ({ trials, longerCount }) => {
  const empiricalProbability = trials > 0 
    ? ((longerCount / trials) * 100).toFixed(1) 
    : '0.0';

  return (
    <div className="bg-gray-800 rounded-lg shadow p-6 w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-medium text-gray-100 mb-4">Statistics</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-400">Total Trials</div>
          <div className="mt-1 text-2xl font-semibold text-gray-100">
            {trials}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-gray-400">Longer Chords</div>
          <div className="mt-1 text-2xl font-semibold text-green-400">
            {longerCount}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-gray-400">Empirical Probability</div>
          <div className="mt-1 text-2xl font-semibold text-blue-400">
            {empiricalProbability}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;