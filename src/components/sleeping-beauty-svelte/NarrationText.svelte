<script>
  import { onMount, onDestroy, createEventDispatcher, tick } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import Typed from 'typed.js';

  export let text = '';
  export let skipTyping = false;

  const dispatch = createEventDispatcher();
  let typingComplete = false;
  let typingElement;
  let typedInstance = null;
  let componentId = Math.random().toString(36).slice(2, 8);

  function log(msg, data = {}) {
    console.log(`[NarrationText:${componentId}] ${msg}`, data);
  }

  function handleComplete() {
    log('Typing complete');
    if (typedInstance?.cursor) {
      typedInstance.cursor.style.display = 'none';
    }
    typingComplete = true;
    dispatch('complete');
  }

  async function initTyping() {
    log('Initializing typing', {
      hasText: !!text,
      textLength: text?.length,
      hasElement: !!typingElement,
      skipTyping,
      complete: typingComplete
    });

    if (!typingElement || !text) {
      log('Cannot initialize - missing dependencies');
      return;
    }

    try {
      // Clean up any existing instance
      if (typedInstance) {
        log('Cleaning up existing Typed instance');
        typedInstance.destroy();
        typedInstance = null;
      }

      // Clear the element
      typingElement.innerHTML = '';
      
      await tick();

      log('Creating new Typed instance');
      
      typedInstance = new Typed(typingElement, {
        strings: [text],
        typeSpeed: 35,
        showCursor: true,
        cursorChar: '▎',
        loop: false,
        backspace: 0,
        backDelay: Infinity, // Prevent any backspacing
        startDelay: 400,
        onComplete: handleComplete,
        contentType: 'html',
        onBegin: () => log('Typing animation started'),
        onStop: () => log('Typing animation stopped'),
        onStringTyped: () => log('String typed')
      });

      log('Typed instance created');
    } catch (error) {
      console.error(`[NarrationText:${componentId}] Error initializing typing:`, error);
    }
  }

  async function handleSkip() {
    log('Skip requested', { hasInstance: !!typedInstance });
    
    if (!typedInstance || typingComplete) {
      log('Skip ignored - no instance or already complete');
      return;
    }
    
    try {
      // Stop the instance from typing more
      typedInstance.stop();
      
      // Set full text immediately and ensure it stays
      typingComplete = true;
      typingElement.innerHTML = text;
      
      // Clean up but preserve the text
      const currentText = typingElement.innerHTML;
      typedInstance.destroy();
      typedInstance = null;
      typingElement.innerHTML = currentText;
      
      // Mark as complete and dispatch event
      handleComplete();
      log('Skip completed successfully');
    } catch (error) {
      console.error(`[NarrationText:${componentId}] Error during skip:`, error);
    }
  }

  // Initialize when the element is ready and we have text
  $: if (typingElement && text && !skipTyping && !typedInstance && !typingComplete) {
    log('Dependencies ready, initializing typing');
    initTyping();
  }

  onMount(() => {
    log('Component mounted');
    if (skipTyping) {
      log('Skip mode active, completing immediately');
      handleComplete();
    }
  });

  onDestroy(() => {
    log('Component destroying');
    if (typedInstance) {
      typedInstance.destroy();
      typedInstance = null;
    }
  });
</script>

<div class="relative px-4 pb-6 md:pb-8" in:fly={{ y: 20, duration: 500 }} on:click={handleSkip}>
  <div class="text-lg md:text-xl text-white/90 font-medium leading-relaxed tracking-wide"
       style="min-height: 6rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5); max-width: 70ch; margin: 0 auto;">
    {#if skipTyping}
      <p>{@html text}</p>
    {:else}
      <div bind:this={typingElement} class="min-h-[1.5em]" />
    {/if}
  </div>

  {#if !typingComplete && !skipTyping}
    <div class="absolute bottom-0 right-0 text-sm text-white/50 italic"
         in:fade={{ delay: 1000 }}>
      Click anywhere to skip
    </div>
  {/if}
</div>