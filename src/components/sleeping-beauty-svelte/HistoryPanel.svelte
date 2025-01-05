<script>
export let history = [];
</script>

<div class="fixed top-0 right-0 w-[24rem] h-screen bg-black/30 backdrop-blur-md border-l border-white/10 overflow-hidden z-40">
  <div class="p-6">
    <h2 class="text-xl font-semibold text-white mb-4">History</h2>
    <div class="space-y-4 overflow-y-auto" style="max-height: calc(100vh - 8rem);">
      {#each history as message, i}
        <div 
          class="text-white/80 text-sm leading-relaxed p-4 rounded-lg bg-white/5 border border-white/10"
          in:fade={{duration: 300, delay: i * 100}}>
          {message}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .fade-enter {
    opacity: 0;
    transform: translateY(10px);
  }
  .fade-enter-active {
    transition: opacity 300ms, transform 300ms;
  }
  .fade-enter-to {
    opacity: 1;
    transform: translateY(0);
  }
</style>