<script>
import { fade } from 'svelte/transition';
import { onMount } from 'svelte';
import VideoBackground from '../VideoBackground.svelte';
import NarrationText from '../NarrationText.svelte';
import { currentStage, history, skipTyping } from '../libs/stores.js';

console.log('[IntroStage] Initializing...');

const introText = "Welcome to the Sleeping Beauty Paradox. You are about to participate in an experiment. A fair coin will be flipped. If it lands on Heads, you'll be awakened once. If it lands on Tails, you'll be awakened twice, but you won't remember the first awakening...";

console.log('[IntroStage] introText initialized:', introText);

let videoLoaded = false;
let videoError = null;

// Subscribe to skipTyping store to log changes
$: console.log('[IntroStage] skipTyping value:', $skipTyping);

function handleComplete() {
  console.log('[IntroStage] Narration complete, current history:', [...$history]);
  console.log('[IntroStage] Updating history with:', introText);
  history.update(h => {
    const newHistory = [...h, introText];
    console.log('[IntroStage] New history:', newHistory);
    return newHistory;
  });
}

function handleContinue() {
  console.log('[IntroStage] Continue clicked, current stage:', $currentStage);
  console.log('[IntroStage] Moving to firstAwakening stage');
  currentStage.set('firstAwakening');
}

function handleVideoLoad() {
  console.log('[IntroStage] Video loaded successfully');
  videoLoaded = true;
  console.log('[IntroStage] videoLoaded set to:', videoLoaded);
}

function handleVideoError(event) {
  const error = event.detail;
  console.error('[IntroStage] Video error:', error);
  videoError = error.message || 'Failed to load video';
  console.error('[IntroStage] videoError set to:', videoError);
}

onMount(() => {
  console.log('[IntroStage] Component mounted');
  console.log('[IntroStage] Initial state:', {
    videoLoaded,
    videoError,
    introText,
    skipTyping: $skipTyping,
    currentStage: $currentStage,
    historyLength: $history.length
  });
});
</script>

<div class="relative w-full h-screen" in:fade={{duration: 500}}>
  <VideoBackground 
    videoSource="/assets/first.mp4"
    isPlaying={true}
    on:loadeddata={handleVideoLoad}
    on:error={handleVideoError}
  />
  {#if videoLoaded}
<div class="absolute inset-0 flex items-end justify-center bg-gradient-to-b from-transparent via-black/30 to-black/50 pb-16">
      <div class="max-w-2xl w-full mx-8">
        <div class="bg-black/5 backdrop-blur-md p-8 rounded-xl">
          <div class="space-y-6">
            <NarrationText
              text={introText}
              skipTyping={$skipTyping}
              on:complete={handleComplete}
            />
            <div in:fade={{duration: 300, delay: 500}}>
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
  {/if}
</div>