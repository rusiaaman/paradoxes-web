<script>
import { fade } from 'svelte/transition';
import IntroStage from './stages/IntroStage.svelte';
import FirstAwakeningStage from './stages/FirstAwakeningStage.svelte';
import PerspectiveShiftStage from './stages/PerspectiveShiftStage.svelte';
import ExplanationStage from './stages/ExplanationStage.svelte';
import HistoryPanel from './HistoryPanel.svelte';
import { currentStage, history } from './libs/stores.js';

let stageComponent;
$: {
  switch ($currentStage) {
    case 'intro':
      stageComponent = IntroStage;
      break;
    case 'firstAwakening':
      stageComponent = FirstAwakeningStage;
      break;
    case 'perspectiveShift':
      stageComponent = PerspectiveShiftStage;
      break;
    case 'explanation':
      stageComponent = ExplanationStage;
      break;
    default:
      stageComponent = IntroStage;
  }
}
</script>

<div class="relative min-h-screen bg-black text-white overflow-hidden">
  <div 
    role="link"
    class="absolute top-4 left-4 text-white hover:text-blue-300 transition-colors z-50 cursor-pointer"
    on:click={() => window.location.href = '/'}
  >
    ← Back to Home
  </div>
  
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
  
  {#if $history.length > 0}
    <HistoryPanel history={$history} />
  {/if}
</div>