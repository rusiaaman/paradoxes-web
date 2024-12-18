import React from 'react';
import VideoBackground from '../VideoBackground';
import NarrationText from '../NarrationText';
import ProbabilitySelector from '../ProbabilitySelector';
import { PROBABILITY_OPTIONS } from '../../../constants';

function FirstAwakeningStage({ onComplete, skipTyping, setSkipTyping, addToHistory }) {
  return (
    <div className="relative h-screen w-full md:w-[calc(100vw-24rem)]">
      <div className="absolute inset-0 z-0">
        <VideoBackground 
          videoSource="/assets/second.mp4" 
          isPlaying={true}
          onLoadedData={() => console.log('Second video loaded')} 
        />
      </div>
      <div className="absolute inset-0 flex items-end pb-32 justify-center">
        <div className="max-w-2xl w-full px-4">
          <div className="bg-black/5 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
            <div className="opacity-100">
              <NarrationText
                text="You are now awake. If the coin landed Heads, you are awakened once. If Tails, you wake twice (but won't remember the first awakening). What is the probability that the coin landed Heads?"
                onComplete={() => addToHistory("You are now awake. If the coin landed Heads, you are awakened once. If Tails, you wake twice (but won't remember the first awakening). What is the probability that the coin landed Heads?")}
                skipTyping={skipTyping}
                setSkipTyping={setSkipTyping}
              />
            </div>
            <div className="mt-8">
              <ProbabilitySelector
                options={PROBABILITY_OPTIONS}
                onSelect={(prob) => {
                  addToHistory(`Initial probability assessment: ${prob === 0.5 ? "1/2 (50%)" : "1/3 (33.3%)"}`);
                  onComplete();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstAwakeningStage;