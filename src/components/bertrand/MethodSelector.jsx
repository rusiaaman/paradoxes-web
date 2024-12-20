import React from 'react';

const methods = [
  {
    id: 'endpoints',
    name: 'Random Endpoints',
    description: 'Pick two random points on the circle\'s circumference',
    probability: '1/3'
  },
  {
    id: 'radius',
    name: 'Random Radius',
    description: 'Pick a random radius and a random point along it',
    probability: '1/2'
  },
  {
    id: 'midpoint',
    name: 'Random Midpoint',
    description: 'Pick a random point inside the circle as chord midpoint',
    probability: '1/4'
  }
];

const MethodSelector = ({ selectedMethod, onMethodChange }) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <h3 className="text-lg font-medium text-gray-100">Select Method</h3>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        {methods.map((method) => (
          <div
            key={method.id}
            className={`relative rounded-lg p-4 cursor-pointer border-2 transition-all
              ${selectedMethod === method.id
                ? 'border-blue-400 bg-gray-700'
                : 'border-gray-600 hover:border-blue-400 bg-gray-800'}`}
            onClick={() => onMethodChange(method.id)}
          >
            <div className="space-y-1">
              <h4 className="font-medium text-gray-100">{method.name}</h4>
              <p className="text-sm text-gray-400">{method.description}</p>
              <div className="text-sm font-semibold text-blue-400">
                P(longer) = {method.probability}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MethodSelector;