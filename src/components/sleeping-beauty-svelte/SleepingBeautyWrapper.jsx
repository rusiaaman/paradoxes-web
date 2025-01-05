import React, { useEffect, useRef } from 'react';
import SleepingBeautyComponent from './SleepingBeautySvelte.svelte';

const SleepingBeautyWrapper = () => {
  const svelteContainerRef = useRef(null);
  const svelteComponent = useRef(null);

  useEffect(() => {
    if (!svelteContainerRef.current) return;
    
    try {
      const target = svelteContainerRef.current;
      svelteComponent.current = null;
      
      // Create component instance
      const component = new SleepingBeautyComponent({
        target: target,
        props: {}
      });

      svelteComponent.current = component;

      // Cleanup on unmount
      return () => {
        if (svelteComponent.current) {
          svelteComponent.current.$destroy();
        }
      };
    } catch (error) {
      console.error('Failed to initialize Svelte component:', error);
    }
  }, []);

  return <div ref={svelteContainerRef}></div>;
};

export default SleepingBeautyWrapper;