
<script>
  import { onMount } from 'svelte';
  let el;
  let typed = null;
  
  onMount(async () => {
    console.log('[MinimalTest] Component mounted');
    console.log('[MinimalTest] Element reference:', el);
    
    const { default: Typed } = await import('typed.js');
    console.log('[MinimalTest] Typed.js imported');
    
    typed = new Typed(el, {
      strings: ['Hello from minimal test!'],
      typeSpeed: 35,
      contentType: 'html',
    });
    
    console.log('[MinimalTest] Typed instance created');
    
    return () => {
      if (typed) {
        typed.destroy();
      }
    };
  });
</script>

<div bind:this={el} class="text-white text-2xl" />
