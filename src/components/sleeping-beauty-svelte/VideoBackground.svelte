<script>
import { onMount, onDestroy, createEventDispatcher } from 'svelte';

export let videoSource;
export let isPlaying = true;

const dispatch = createEventDispatcher();
let video;
let overlay;
let loaded = false;
let error = null;
let currentPlayPromise = null;
let mountTime = Date.now();

async function handlePlayState(shouldPlay) {
  if (!video) {
    console.warn('Video element not available for play state change');
    return;
  }
  
  try {
    console.log(`Attempting to ${shouldPlay ? 'play' : 'pause'} video`);
    
    // If there's an ongoing play operation, wait for it
    if (currentPlayPromise) {
      console.log('Waiting for previous play operation to complete');
      await currentPlayPromise;
    }
    
    if (shouldPlay) {
      // Store the new play promise
      console.log('Starting new play operation');
      currentPlayPromise = video.play();
      await currentPlayPromise;
      console.log('Play operation completed successfully');
      
      // After successful play, ensure loaded state is updated
      if (!loaded) {
        console.log('Video loaded and playing, updating loaded state');
        loaded = true;
        if (video && overlay) {
          video.style.opacity = '1';
          overlay.style.opacity = '0.5';
        }
        dispatch('loadeddata');
      }
    } else {
      video.pause();
      console.log('Video paused successfully');
    }
  } catch (err) {
    // Only log error if component is still mounted and it's not a play interruption
    if (video && !err.message?.includes('interrupted by a call to pause')) {
      console.error("Video playback error:", err);
      const errorMessage = err.message || 'Unknown playback error';
      error = new Error(`Playback failed: ${errorMessage}`);
      dispatch('error', { message: errorMessage });
    }
  } finally {
    currentPlayPromise = null;
  }
}

$: if (video && isPlaying !== undefined) {
  console.log('Play state changed:', isPlaying);
  handlePlayState(isPlaying);
}

onMount(() => {
  console.log('VideoBackground mounting, source:', videoSource);
  
  if (!video) {
    console.error('Video element not available on mount');
    return;
  }

  // Add event listeners for debug only
  video.addEventListener('stalled', () => console.warn('Video playback stalled'));
  video.addEventListener('waiting', () => console.warn('Video playback waiting'));
  video.addEventListener('suspend', () => console.warn('Video loading suspended'));
  
  // Add error handler
  video.addEventListener('error', (e) => {
    if (video) {
      const errorEvent = e.target.error || e;
      const errorMessage = errorEvent.message || 'Unknown video error';
      console.error("Video loading error:", errorMessage, errorEvent);
      error = new Error(errorMessage);
      dispatch('error', { message: errorMessage });
    }
  });
  
  // Start loading
  console.log('Initiating video load');
  video.load();
});

onDestroy(() => {
  console.log('VideoBackground unmounting');
  
  // Pause the video before cleanup
  if (video) {
    video.pause();
    
    // Clear src to stop any ongoing loading
    video.src = '';
    video.load();
  }
  
  // Cleanup any ongoing play promise
  if (currentPlayPromise) {
    currentPlayPromise.catch(() => {
      console.log('Cleaned up pending play promise');
    });
  }
});
</script>

<div class="absolute inset-0 w-full h-full">
  <!-- Video element -->
  <video
    bind:this={video}
    src={videoSource}
    class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
    class:opacity-0={!loaded || error}
    class:opacity-100={loaded && !error}
    muted
    loop={!videoSource.includes('second.mp4')}
    playsInline
    autoplay
  />
  
  <!-- Overlay -->
  <div 
    bind:this={overlay}
    class="absolute inset-0 bg-black transition-opacity duration-500"
    class:opacity-50={loaded && !error}
    class:opacity-100={!loaded || error}
  />
  
  <!-- Loading/Error States -->
  {#if !loaded || error}
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="text-white text-center p-4">
        {#if error}
          <p class="text-xl mb-2">Unable to load video</p>
          <p class="text-sm text-gray-400">Error: {error.message}</p>
        {:else}
          <p class="text-xl">Loading video...</p>
        {/if}
      </div>
    </div>
  {/if}
</div>