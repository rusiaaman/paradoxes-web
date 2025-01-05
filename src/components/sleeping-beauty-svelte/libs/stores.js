import { writable, derived } from 'svelte/store';

export const currentStage = writable('intro');
export const history = writable([]);
export const probability = writable(null);
export const skipTyping = writable(false);

// Derived store for stage transitions
export const stageTransitionState = derived(
  currentStage,
  $currentStage => ({
    previousStage: null,
    currentStage: $currentStage,
    isTransitioning: false
  })
);