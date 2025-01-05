<<<<<<< SEARCH
const dispatch = createEventDispatcher();
let typingElement;
let typedInstance = null;
let isComplete = false;
let shouldAnimate = false;
let mounted = false;
=======
const dispatch = createEventDispatcher();
let typingElement;
let typedInstance = null;
let isComplete = false;
let hasTypingStarted = false;
>>>>>>> REPLACE

<<<<<<< SEARCH
<div class=\"relative px-4 pb-6 md:pb-8\" in:fly={{ y: 20, duration: 500 }}>
  <div 
    bind:this={typingElement}
    class=\"text-lg md:text-xl text-white/90 font-medium leading-relaxed tracking-wide {mounted ? 'opacity-100' : 'opacity-0'}\"
    style=\"min-height: 6rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5); max-width: 70ch; margin: 0 auto;\"
  >
    {#if skipTyping}
      {@html text}
    {/if}
  </div>
=======
<div class=\"relative px-4 pb-6 md:pb-8\" in:fly={{ y: 20, duration: 500 }}>
  <!-- Empty div for Typed.js to work with -->
  <div 
    bind:this={typingElement}
    class=\"text-lg md:text-xl text-white/90 font-medium leading-relaxed tracking-wide transition-opacity duration-200 {hasTypingStarted ? 'opacity-100' : 'opacity-0'}\"
    style=\"min-height: 6rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5); max-width: 70ch; margin: 0 auto;\"
  />
  
  <!-- Overlay div for skipTyping mode -->
  {#if skipTyping}
    <div class=\"absolute inset-0 opacity-100\">
      {@html text}
    </div>
  {/if}
>>>>>>> REPLACE

<<<<<<< SEARCH
async function initTyped() {
  console.log('[NarrationText] Initializing Typed.js...', {
    mounted,
    isComplete,
    hasElement: !!typingElement,
    hasText: !!text,
    textLength: text?.length
  });
  
  if (!mounted || !typingElement || !text || isComplete) {
=======
async function initTyped() {
  console.log('[NarrationText] Initializing Typed.js...', {
    hasTypingStarted,
    isComplete,
    hasElement: !!typingElement,
    hasText: !!text,
    textLength: text?.length
  });
  
  if (!typingElement || !text || isComplete) {
>>>>>>> REPLACE

<<<<<<< SEARCH
onMount(async () => {
  console.log('[NarrationText] Component mounted', {
    element: typingElement,
    text,
    skipTyping
  });

  mounted = true;

  if (skipTyping) {
    console.log('[NarrationText] Skipping animation due to skipTyping flag');
    handleTypingComplete();
  } else {
    document.addEventListener('click', handleSkip);
    // Wait for next tick to ensure element is bound
    await tick();
    await initTyped();
  }

  // Verification timeout
  setTimeout(() => {
    console.log('[DEBUG] Final state check:', {
      mounted,
      hasElement: !!typingElement,
      elementInDOM: document.contains(typingElement),
      hasTypedInstance: !!typedInstance,
      innerHTML: typingElement?.innerHTML,
      isComplete
    });
  }, 2000);
});
=======
onMount(async () => {
  console.log('[NarrationText] Component mounted', {
    element: typingElement,
    text,
    skipTyping
  });

  if (skipTyping) {
    console.log('[NarrationText] Skipping animation due to skipTyping flag');
    handleTypingComplete();
  } else {
    document.addEventListener('click', handleSkip);
    // Wait for next tick to ensure element is bound
    await tick();
    await initTyped();
  }
});

// Use afterUpdate to handle state changes
afterUpdate(async () => {
  if (!skipTyping && !hasTypingStarted && typingElement && !isComplete) {
    hasTypingStarted = true;
    console.log('[NarrationText] Starting typing animation');
  }
});
>>>>>>> REPLACE