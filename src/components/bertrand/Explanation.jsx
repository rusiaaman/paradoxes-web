import React from 'react';

const Explanation = () => (
  <div className="bg-gray-800 rounded-lg shadow-sm p-6">
    <h3 className="text-xl font-semibold text-gray-100 mb-4">Understanding the Paradox</h3>
    
    <div className="prose prose-invert prose-blue max-w-none">
      <p>
        Bertrand's paradox, introduced by Joseph Bertrand in 1889, demonstrates how we can get different 
        probabilities for seemingly the same geometric question, depending on our interpretation of 
        "random." The paradox helps us understand the importance of clearly defining what we mean by 
        randomness in probability problems.
      </p>

      <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">The Three Methods</h4>
      
      <ol className="list-decimal list-inside space-y-2 mb-4">
        <li className="text-gray-300">
          <span className="font-medium text-gray-100">Random Endpoints (P=1/3):</span> Choose two random points on 
          the circle's circumference. This is like randomly cutting a string that's been bent into a 
          circle at two points.
        </li>
        <li className="text-gray-300">
          <span className="font-medium text-gray-100">Random Radius (P=1/2):</span> Choose a random radius and a 
          random point along it. The chord is drawn perpendicular to the radius at this point.
        </li>
        <li className="text-gray-300">
          <span className="font-medium text-gray-100">Random Midpoint (P=1/4):</span> Choose a random point inside 
          the circle to be the midpoint of the chord. The chord is then drawn through this point, 
          perpendicular to the radius.
        </li>
      </ol>

      <h4 className="text-lg font-medium text-gray-100 mt-4 mb-2">Why Are The Probabilities Different?</h4>
      
      <p>
        Each method provides a different way of "randomly" selecting a chord, and each results in a 
        different probability distribution over the space of all possible chords. This illustrates 
        that the concept of "randomness" needs careful definition in geometric probability problems.
      </p>

      <div className="bg-blue-900 p-4 rounded-lg mt-4">
        <h4 className="text-md font-medium text-blue-100 mb-2">Want to Learn More?</h4>
        <p className="text-blue-200">
          Check out Numberphile's excellent video explanation:{' '}
          <a 
            href="https://www.youtube.com/watch?v=mZBwsm6B280" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-100 transition-colors"
          >
            Watch on YouTube
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default Explanation;