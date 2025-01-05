<script>
import { fade } from 'svelte/transition';
import NarrationText from '../NarrationText.svelte';
import { history, probability, skipTyping } from '../libs/stores.js';

let probabilityText;
$: probabilityText = $probability === 0.5 ? "1/2 (50%)" : "1/3 (33.3%)";

const insightsText = "This paradox reveals deep questions about probability and consciousness. Does your subjective experience of awakening change the probability? Can the same event have different probabilities from different perspectives? The debate continues in philosophy and mathematics, showing how simple setups can lead to profound questions.";

let textCompleted = false;

function handleInsightComplete() {
  if (!textCompleted) {
    textCompleted = true;
    history.update(h => [...h, "The paradox reveals deep questions about probability and consciousness, leading to ongoing philosophical debate."]);
  }
}

function handleComplete() {
  history.update(h => [...h, `Final probability assessment: ${probabilityText}`]);
}
</script>

<div 
  class="relative w-full h-screen bg-gradient-to-b from-purple-900 to-black overflow-hidden"
  in:fade={{duration: 500}}
>
  <div class="absolute inset-0 flex items-center justify-center">
    <div class="w-full md:w-[calc(100vw-26rem)] max-w-3xl px-4 py-6 md:p-6 max-h-screen overflow-y-auto mr-4">
      <div class="bg-black/5 backdrop-blur-sm p-8 rounded-xl shadow-2xl space-y-8" in:fade={{duration: 500, delay: 200}}>
        <div class="opacity-100">
          <NarrationText
            text={`You assessed the probability as ${probabilityText}. Let's explore why this is such a fascinating paradox.`}
            skipTyping={true}
            on:complete={handleComplete}
          />
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8" in:fade={{duration: 300, delay: 400}}>
          <div class="bg-transparent backdrop-blur-md border border-white/10 p-6 rounded-xl">
            <h3 class="text-xl font-bold text-blue-400 mb-4 opacity-100">Halfers Argument (1/2)</h3>
            <ul class="space-y-3 text-gray-200 opacity-100">
              <li class="flex gap-2">
                <span class="text-blue-400">•</span>
                <span>The coin is fair and was flipped only once</span>
              </li>
              <li class="flex gap-2">
                <span class="text-blue-400">•</span>
                <span>No new information is gained upon awakening</span>
              </li>
              <li class="flex gap-2">
                <span class="text-blue-400">•</span>
                <span>Multiple awakenings don't affect the past outcome</span>
              </li>
            </ul>
          </div>

          <div class="bg-transparent backdrop-blur-md border border-white/10 p-6 rounded-xl">
            <h3 class="text-xl font-bold text-blue-400 mb-4 opacity-100">Thirders Argument (1/3)</h3>
            <ul class="space-y-3 text-gray-200 opacity-100">
              <li class="flex gap-2">
                <span class="text-blue-400">•</span>
                <span>Three possible awakening scenarios</span>
              </li>
              <li class="flex gap-2">
                <span class="text-blue-400">•</span>
                <span>One with Heads, two with Tails</span>
              </li>
              <li class="flex gap-2">
                <span class="text-blue-400">•</span>
                <span>Each awakening is equally likely</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="bg-transparent backdrop-blur-md border border-white/10 p-6 rounded-xl" in:fade={{duration: 300, delay: 600}}>
          <h3 class="text-xl font-bold text-blue-400 mb-4 opacity-100">Key Insights</h3>
          <div class="min-h-[200px]">
            <NarrationText
              text={insightsText}
              skipTyping={true}
              on:complete={handleInsightComplete}
            />
          </div>
        </div>

        <div class="flex justify-center gap-4" in:fade={{duration: 300, delay: 800}}>
          <a
            href="https://www.youtube.com/watch?v=XeSu9fBJ2sI"
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Watch Veritasium's Explanation
          </a>
          <a
            href="https://en.wikipedia.org/wiki/Sleeping_Beauty_problem"
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            Read on Wikipedia
          </a>
        </div>
      </div>
    </div>
  </div>
</div>