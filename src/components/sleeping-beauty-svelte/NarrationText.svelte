<script>
import { onMount, onDestroy, createEventDispatcher } from 'svelte';
import Typed from 'typed.js';
import { fade, fly } from 'svelte/transition';

export let text = '';
export let skipTyping = false;

const dispatch = createEventDispatcher();
let elementRef;
let typed = null;
let displayText = '';
let isComplete = false;

$: if (text && !displayText && !typed) {
  if (skipTyping) {
    displayText = text;
    isComplete = true;
    dispatch('complete');
  } else {
    initTyping();
  }
}

function initTyping() {
  if (elementRef && text) {
    typed = new Typed(elementRef, {
      strings: [text],
      typeSpeed: 35,
      showCursor: true,
      cursorChar: '▎',
      loop: false,
      fadeOut: false,
      onComplete: () => {
        displayText = text;
        isComplete = true;
        dispatch('complete');
        typed?.cursor?.style.display = 'none';
      }
    });
  }
}

const handleTypingComplete = () => {
  if (typed?.cursor) {
    typed.cursor.style.display = 'none';
  }
  
  finalText = text;
  displayText = text;
  isComplete = true;
  
  // Call onComplete in next frame to ensure state is settled
  requestAnimationFrame(() => {
    dispatch('complete');
  });
};

const handleSkip = (e) => {
  if (isComplete || !typed) return;

  e.stopPropagation();
  
  // Cleanup typed instance first
  if (typed) {
    typed.destroy();
    typed = null;
  }
  
  // Then complete
  handleTypingComplete();
};

onMount(() => {
  // If already complete, maintain text visibility
  if (isComplete) {
    displayText = finalText;
    return;
  }

  // Handle skip request
  if (skipTyping) {
    finalText = text;
    displayText = text;
    isComplete = true;
    dispatch('complete');
    return;
  }

  // Start new typing animation
  if (elementRef && text) {
    typed = new Typed(elementRef, {
      strings: [text],
      typeSpeed: 35,
      showCursor: true,
      cursorChar: '▎',
      loop: false,
      fadeOut: false,
      backspace: 0,
      onComplete: handleTypingComplete,
      startDelay: 400,
      contentType: 'html',
    });

    // Add skip handler
    document.addEventListener('click', handleSkip);
  }

  return () => {
    if (typed) {
      typed.destroy();
      typed = null;
    }
    document.removeEventListener('click', handleSkip);
  };
});
</script>

<div class="relative px-4 pb-6 md:pb-8" 
  in:fly={{ y: 20, duration: 500 }}>
  <div 
    bind:this={elementRef}
    class="text-lg md:text-xl text-white/90 font-medium leading-relaxed tracking-wide"
    style="min-height: 6rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5); max-width: 70ch; margin: 0 auto;"
  >
    {#if displayText}
      {@html displayText}
    {:else}
      <span>&nbsp;</span>
    {/if}
  </div>
  
  {#if !isComplete && !skipTyping}
    <div
      class="absolute bottom-0 right-0 text-sm text-white/50 italic"
      in:fade={{delay: 1000}}
    >
      Click anywhere to skip
    </div>
  {/if}
</div>

<svelte:window on:click={() => {
  if (!isComplete && !skipTyping && typed) {
    typed.destroy();
    displayText = text;
    isComplete = true;
    dispatch('complete');
  }
}}/>

<style>
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