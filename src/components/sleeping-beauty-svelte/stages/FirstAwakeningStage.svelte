<script>
import { fade } from 'svelte/transition';
import VideoBackground from '../VideoBackground.svelte';
import NarrationText from '../NarrationText.svelte';
import ProbabilitySelector from '../ProbabilitySelector.svelte';
import { PROBABILITY_OPTIONS } from '../libs/constants.js';
import { currentStage, history, skipTyping } from '../libs/stores.js';

const awakeningText = "You are now awake. If the coin landed Heads, you are awakened once. If Tails, you wake twice (but won't remember the first awakening). What is the probability that the coin landed Heads?";

let videoLoaded = false;

function handleVideoLoad() {
  console.log('Second video loaded');
  videoLoaded = true;
}

function handleComplete() {
  history.update(h => [...h, awakeningText]);
}

function handleProbabilitySelect(event) {
  const prob = event.detail;
  history.update(h => [...h, `Initial probability assessment: ${prob === 0.5 ? "1/2 (50%)" : "1/3 (33.3%)"}`]);
  currentStage.set('perspectiveShift');
}
</script>

<div class="relative h-screen w-full md:w-[calc(100vw-24rem)]" in:fade={{duration: 500}}>
  <VideoBackground 
    videoSource="/assets/second.mp4" 
    isPlaying={true}
    on:loadeddata={handleVideoLoad}
  />
  
  {#if videoLoaded}
    <div class="absolute inset-0 flex items-center justify-center" in:fade={{duration: 500}}>
      <div class="max-w-2xl w-full px-4 py-8">
        <div class="bg-black/5 backdrop-blur-sm p-8 rounded-xl shadow-2xl" in:fade={{duration: 500, delay: 200}}>
          <div class="opacity-100">
            <NarrationText
              text={awakeningText}
              skipTyping={$skipTyping}
              on:complete={handleComplete}
            />
          </div>
          <div class="mt-8" in:fade={{duration: 300, delay: 300}}>
            <ProbabilitySelector
              options={PROBABILITY_OPTIONS}
              on:select={handleProbabilitySelect}
            />
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>