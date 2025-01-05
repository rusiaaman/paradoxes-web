<script>
import NarrationText from '../NarrationText.svelte';
import ProbabilitySelector from '../ProbabilitySelector.svelte';
import { PROBABILITY_OPTIONS } from '../libs/constants.js';
import { currentStage, history, probability, skipTyping } from '../libs/stores.js';

function handleComplete() {
  history.update(h => [...h, "Let's look at this from a different perspective. Here are all possible awakening scenarios. With Heads, there's one awakening. With Tails, there are two awakenings. Looking at all equally possible awakening events, what's the probability the coin landed Heads?"]);
}

function handleProbabilitySelect(event) {
  const prob = event.detail;
  probability.set(prob);
  history.update(h => [...h, `After seeing all scenarios, probability assessment: ${prob === 0.5 ? "1/2 (50%)" : "1/3 (33.3%)"}`]);
  currentStage.set('explanation');
}
</script>

<div class="relative w-full md:w-[calc(100vw-24rem)] h-screen">
  <img
    src="/assets/bedroom_scene.webp"
    alt="Bedroom Scene"
    class="absolute top-0 left-0 w-full h-full object-cover"
  />
  <div class="absolute inset-0 flex items-start md:items-center justify-center overflow-y-auto">
    <div class="w-full max-w-4xl p-4 md:p-6 mt-16 md:mt-0">
      <div class="bg-black/30 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-2xl">
        <img
          src="/assets/three_scenarios.webp"
          alt="Three Scenarios"
          class="w-full max-w-2xl mx-auto mb-4 md:mb-8 rounded-lg"
        />
        <div class="opacity-100 mt-4">
          <NarrationText
            text="Consider your experience upon awakening. From your perspective in that moment, you could be in any of these three possible scenarios – the single awakening if Heads, or either of the two awakenings if Tails. Since each awakening feels identical and you have no way to distinguish between them, what's the probability that the coin landed Heads?"
            {skipTyping}
            on:complete={handleComplete}
          />
        </div>
        <div class="mt-8">
          <ProbabilitySelector
            options={PROBABILITY_OPTIONS}
            on:select={handleProbabilitySelect}
          />
        </div>
      </div>
    </div>
  </div>
</div>