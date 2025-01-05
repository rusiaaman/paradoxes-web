<script>
import { createEventDispatcher } from 'svelte';
import { fly, scale } from 'svelte/transition';

export let options = [];
let selected = null;

const dispatch = createEventDispatcher();

function handleSelect(value) {
  selected = value === selected ? null : value;
}

function handleSubmit() {
  if (selected !== null) {
    dispatch('select', selected);
  }
}
</script>

<div
  class="flex flex-col items-center space-y-6 bg-black/20 backdrop-blur-sm px-4 py-6 md:px-8 md:py-8 rounded-xl border border-white/10 shadow-2xl"
  in:fly={{ y: 20, duration: 500 }}
>
  <div class="space-y-4 w-full max-w-md">
    {#each options as option}
      <label 
        class="flex items-center p-4 md:p-5 rounded-xl transition-all duration-300 cursor-pointer
          border border-white/10 backdrop-blur-sm shadow-lg
          {selected === option.value 
            ? 'bg-blue-600/40 border-blue-400/50 shadow-blue-500/20' 
            : 'bg-black/20 hover:bg-white/10 hover:border-white/20'}"
      >
        <div class="relative">
          <input
            type="radio"
            name="probability"
            value={option.value}
            checked={selected === option.value}
            on:change={() => handleSelect(option.value)}
            class="w-5 h-5 opacity-0 absolute"
          />
          <div class="w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-300
            {selected === option.value 
              ? 'border-blue-400 bg-blue-400' 
              : 'border-white/40'}"
          >
            {#if selected === option.value}
              <div
                class="w-2 h-2 bg-white rounded-full"
                in:scale={{ duration: 200, start: 0 }}
              ></div>
            {/if}
          </div>
        </div>
        <span class="text-white text-lg font-medium">{option.label}</span>
      </label>
    {/each}
  </div>

  <button
    on:click={handleSubmit}
    disabled={!selected}
    class="w-full md:w-auto px-8 py-4 rounded-xl font-medium text-lg
      transition-all duration-300 transform hover:scale-105 active:scale-95
      {selected
        ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30'
        : 'bg-gray-500/50 cursor-not-allowed text-gray-300'}"
  >
    Confirm
  </button>
</div>

<style>
  .scale-enter {
    transform: scale(0);
  }
  .scale-enter-active {
    transition: transform 200ms ease;
  }
  .scale-enter-to {
    transform: scale(1);
  }

  .fade-enter {
    opacity: 0;
    transform: translateY(20px);
  }
  .fade-enter-active {
    transition: opacity 500ms, transform 500ms;
  }
  .fade-enter-to {
    opacity: 1;
    transform: translateY(0);
  }
</style>