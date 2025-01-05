<script>
import { onMount, onDestroy, createEventDispatcher } from 'svelte';
import gsap from 'gsap';

export let videoSource;
export let isPlaying;

const dispatch = createEventDispatcher();
let video;
let overlay;
let loaded = false;
let error = null;
let timeout;

onMount(() => {
  if (!video) return;

  const fadeInVideo = () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      gsap.to(video, {
        duration: 1,
        opacity: 1,
        ease: 'power2.inOut'
      });

      gsap.to(overlay, {
        duration: 1,
        opacity: 0.5,
        ease: 'power2.inOut'
      });
    }, 0);
  };

  const handleError = (e) => {
    console.error("Video loading error:", e);
    error = e;
    dispatch('loadeddata');
  };

  const handleLoadedData = () => {
    error = null;
    loaded = true;
    fadeInVideo();
    dispatch('loadeddata');
  };

  video.addEventListener('loadeddata', handleLoadedData);
  video.addEventListener('error', handleError);
  
  try {
    video.load();
  } catch (e) {
    handleError(e);
  }
  
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    video.removeEventListener('loadeddata', handleLoadedData);
    video.removeEventListener('error', handleError);
  };
});

$: if (video && loaded && isPlaying !== undefined) {
  const playVideo = async () => {
    if (isPlaying) {
      try {
        await video.play();
      } catch (error) {
        console.log("Video play error:", error);
      }
    } else {
      video.pause();
    }
  };

  playVideo();
}
</script>

<div class="absolute inset-0 w-full h-full">
  {#if error}
    <div class="absolute inset-0 flex items-center justify-center bg-black">
      <div class="text-white text-center p-4">
        <p>Unable to load video</p>
        <p class="text-sm text-gray-400">Please check if the video file exists at {videoSource}</p>
      </div>
    </div>
  {:else}
    <video
      bind:this={video}
      src={videoSource}
      class="absolute inset-0 w-full h-full object-cover opacity-0"
      muted
      loop={!videoSource.includes('second.mp4')}
      playsInline
      autoplay
    />
    <div 
      bind:this={overlay}
      class="absolute inset-0 bg-black opacity-0"
    />
  {/if}
</div>