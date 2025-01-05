import React, { useState, useCallback } from 'react';
import NarrationText from '../NarrationText';

function ExplanationStage({ selectedProbability, skipTyping, setSkipTyping, addToHistory }) {
  const probabilityText = selectedProbability === 0.5 ? "1/2 (50%)" : "1/3 (33.3%)";
  const [textCompleted, setTextCompleted] = useState(false);
  
  const handleInsightComplete = useCallback(() => {
    if (!textCompleted) {
      setTextCompleted(true);
      addToHistory("The paradox reveals deep questions about probability and consciousness, leading to ongoing philosophical debate.");
    }
  }, [addToHistory, textCompleted]);

  return (
    <div 
      className="relative w-full h-screen bg-gradient-to-b from-purple-900 to-black overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full md:w-[calc(100vw-26rem)] max-w-3xl px-4 py-6 md:p-6 max-h-screen overflow-y-auto mr-4">
          <div className="bg-black/5 backdrop-blur-sm p-8 rounded-xl shadow-2xl space-y-8">
            <div className="opacity-100">
              <NarrationText
                text={`You assessed the probability as ${probabilityText}. Let's explore why this is such a fascinating paradox.`}
                onComplete={() => addToHistory(`Final probability assessment: ${probabilityText}`)}
                skipTyping={skipTyping}
                setSkipTyping={setSkipTyping}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
              <div className="bg-transparent backdrop-blur-md border border-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-blue-400 mb-4 opacity-100">Halfers Argument (1/2)</h3>
                <ul className="space-y-3 text-gray-200 opacity-100">
                  <li className="flex gap-2">
                    <span className="text-blue-400">•</span>
                    <span>The coin is fair and was flipped only once</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-400">•</span>
                    <span>No new information is gained upon awakening</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Multiple awakenings don't affect the past outcome</span>
                  </li>
                </ul>
              </div>

              <div className="bg-transparent backdrop-blur-md border border-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-blue-400 mb-4 opacity-100">Thirders Argument (1/3)</h3>
                <ul className="space-y-3 text-gray-200 opacity-100">
                  <li className="flex gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Three possible awakening scenarios</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-400">•</span>
                    <span>One with Heads, two with Tails</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Each awakening is equally likely</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-transparent backdrop-blur-md border border-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-blue-400 mb-4 opacity-100">Key Insights</h3>
              <div className="min-h-[200px]">
                <NarrationText
                  text="This paradox reveals deep questions about probability and consciousness. Does your subjective experience of awakening change the probability? Can the same event have different probabilities from different perspectives? The debate continues in philosophy and mathematics, showing how simple setups can lead to profound questions."
                  onComplete={handleInsightComplete}
                  skipTyping={skipTyping}
                  setSkipTyping={setSkipTyping}
                />
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <a
                href="https://www.youtube.com/watch?v=XeSu9fBJ2sI"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Watch Veritasium's Explanation
              </a>
              <a
                href="https://en.wikipedia.org/wiki/Sleeping_Beauty_problem"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Read on Wikipedia
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplanationStage;