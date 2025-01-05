import { writable, derived } from 'svelte/store';

// Initialize stores with default values and debug logs
function createCurrentStage() {
  const { subscribe, set, update } = writable('intro');
  
  return {
    subscribe,
    set: (value) => {
      console.log('Setting currentStage to:', value);
      set(value);
    },
    update
  };
}

function createHistory() {
  const { subscribe, set, update } = writable([]);
  
  return {
    subscribe,
    set: (value) => {
      console.log('Setting history to:', value);
      set(value);
    },
    update: (fn) => {
      update(store => {
        const newValue = fn(store);
        console.log('Updated history:', newValue);
        return newValue;
      });
    }
  };
}

export const currentStage = createCurrentStage();
export const history = createHistory();
export const probability = writable(null);

// Create skipTyping store with logging
function createSkipTypingStore() {
  const { subscribe, set, update } = writable(false);

  return {
    subscribe,
    set: (value) => {
      console.log('[Store:skipTyping] Setting value to:', value);
      set(value);
    },
    update: (fn) => {
      update(store => {
        const newValue = fn(store);
        console.log('[Store:skipTyping] Updated value to:', newValue);
        return newValue;
      });
    }
  };
}

export const skipTyping = createSkipTypingStore();

// Subscribe to skipTyping changes
skipTyping.subscribe(value => {
  console.log('[Store:skipTyping] Value changed to:', value);
});

// Derived store for stage transitions with debug logging
export const stageTransitionState = derived(
  currentStage,
  ($currentStage, set) => {
    console.log('stageTransitionState updating for stage:', $currentStage);
    set({
      previousStage: null,
      currentStage: $currentStage,
      isTransitioning: false
    });
  }
);