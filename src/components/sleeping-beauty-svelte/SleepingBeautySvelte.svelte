<script>
import { fade } from 'svelte/transition';
import { onMount, onDestroy } from 'svelte';
import IntroStage from './stages/IntroStage.svelte';
import FirstAwakeningStage from './stages/FirstAwakeningStage.svelte';
import PerspectiveShiftStage from './stages/PerspectiveShiftStage.svelte';
import ExplanationStage from './stages/ExplanationStage.svelte';
import HistoryPanel from './HistoryPanel.svelte';
import { currentStage, history, skipTyping } from './libs/stores.js';

// Accept debug prop
export let debug = false;

let mounted = false;
let componentId = Math.random().toString(36).slice(2, 8);

// Debug logging function
function log(message, data = {}) {
  if (debug) {
    console.log(`[SleepingBeautySvelte:${componentId}] ${message}`, data);
  }
}

log('Component initializing...');

// Reset stores on mount
onMount(() => {
  log('Component mounted', {
    currentStage: $currentStage,
    historyLength: $history?.length,
    skipTyping: $skipTyping
  });

  // Reset store states
  currentStage.set('intro');
  history.set([]);
  skipTyping.set(false);

  mounted = true;
  
  log('Stores initialized');
});

onDestroy(() => {
  log('Component destroying');
  mounted = false;
});

$: if (mounted) {
  log('Stage changed', { 
    newStage: $currentStage,
    historyLength: $history?.length,
    skipTyping: $skipTyping
  });
}
</script>

<main class="relative min-h-screen bg-black text-white overflow-hidden">
  <nav class="absolute top-4 left-4 z-50">
    <button
      class="text-white hover:text-blue-300 transition-colors cursor-pointer"
      on:click={() => window.location.href = '/'}
    >
      ← Back to Home
    </button>
  </nav>
  
  <div class="relative w-full h-full">
    {#key $currentStage}
      <div in:fade={{duration: 500}}>
        {#if $currentStage === 'intro'}
          <IntroStage />
        {:else if $currentStage === 'firstAwakening'}
          <FirstAwakeningStage />
        {:else if $currentStage === 'perspectiveShift'}
          <PerspectiveShiftStage />
        {:else if $currentStage === 'explanation'}
          <ExplanationStage />
        {/if}
      </div>
    {/key}
  </div>

  {#if $history.length > 0}
    <HistoryPanel history={$history} />
  {/if}
</main>