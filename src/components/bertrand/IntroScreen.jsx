import React from 'react';

const IntroScreen = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Bertrand's Paradox
        </h1>
        
        <p className="text-xl text-gray-600 leading-relaxed">
          If you choose a random chord in a circle, what is the probability that it's
          longer than the side of an inscribed equilateral triangle?
        </p>
        
        <div className="prose prose-blue mx-auto">
          <p className="text-gray-600">
            The answer might surprise you - it depends on what we mean by "random"!
            Different methods of randomly selecting a chord lead to different probabilities.
          </p>
          
          <p className="text-gray-600">
            Let's explore three different methods and see how they yield three
            different answers: 1/3, 1/2, and 1/4.
          </p>
        </div>

        <button
          onClick={onStart}
          className="inline-flex items-center px-6 py-3 border border-transparent 
                   text-base font-medium rounded-md shadow-sm text-white 
                   bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
                   focus:ring-offset-2 focus:ring-blue-500"
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;