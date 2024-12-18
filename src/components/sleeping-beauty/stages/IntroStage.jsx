import React from 'react';
import VideoBackground from '../VideoBackground';
import NarrationText from '../NarrationText';

function IntroStage({ onContinue, skipTyping, setSkipTyping, addToHistory }) {
  return (
    <div className="relative w-full md:w-[calc(100vw-24rem)] h-screen">
      <VideoBackground 
        videoSource="/assets/first.mp4" 
        isPlaying={true}
        onLoadedData={() => console.log('First video loaded')} 
      />
      <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-b from-transparent via-black/30 to-black/50 pb-16">
        <div className="max-w-2xl w-full mx-8">
          <div className="bg-black/5 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/20">
            <div className="relative z-10 space-y-6">
              <div className="opacity-100">
                <NarrationText
                  text="Welcome to the Sleeping Beauty Paradox. You are about to participate in an experiment. A fair coin will be flipped. If it lands on Heads, you'll be awakened once. If it lands on Tails, you'll be awakened twice, but you won't remember the first awakening..."
                  onComplete={() => addToHistory("Welcome to the Sleeping Beauty Paradox. You are about to participate in an experiment. A fair coin will be flipped. If it lands on Heads, you'll be awakened once. If it lands on Tails, you'll be awakened twice, but you won't remember the first awakening...")}
                  skipTyping={skipTyping}
                  setSkipTyping={setSkipTyping}
                />
              </div>
              <button
                onClick={onContinue}
                className="mt-6 w-full md:w-auto px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg block mx-auto cursor-pointer opacity-100"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroStage;