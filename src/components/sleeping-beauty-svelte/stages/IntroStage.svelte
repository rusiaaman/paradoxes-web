<script>
import VideoBackground from '../VideoBackground.svelte';
import NarrationText from '../NarrationText.svelte';
import { currentStage, history, skipTyping } from '../libs/stores.js';

function handleComplete() {
  history.update(h => [...h, "Welcome to the Sleeping Beauty Paradox. You are about to participate in an experiment. A fair coin will be flipped. If it lands on Heads, you'll be awakened once. If it lands on Tails, you'll be awakened twice, but you won't remember the first awakening..."]);
}

function handleContinue() {
  currentStage.set('firstAwakening');
}
</script>

<div class="relative w-full md:w-[calc(100vw-24rem)] h-screen">
  <VideoBackground 
    videoSource="/assets/first.mp4" 
    isPlaying={true}
    on:loadeddata={() => console.log('First video loaded')} 
  />
  <div class="absolute inset-0 flex items-end justify-center bg-gradient-to-b from-transparent via-black/30 to-black/50 pb-16">
    <div class="max-w-2xl w-full mx-8">
      <div class="bg-black/5 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/20">
        <div class="relative z-10 space-y-6">
          <div class="opacity-100">
            <NarrationText
              text="Welcome to the Sleeping Beauty Paradox. You are about to participate in an experiment. A fair coin will be flipped. If it lands on Heads, you'll be awakened once. If it lands on Tails, you'll be awakened twice, but you won't remember the first awakening..."
              {skipTyping}
              on:complete={handleComplete}
            />
          </div>
          <button
            on:click={handleContinue}
            class="mt-6 w-full md:w-auto px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg block mx-auto cursor-pointer opacity-100"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</div>