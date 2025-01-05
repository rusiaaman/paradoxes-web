import React, { useEffect, useRef } from 'react';
import SleepingBeautyComponent from './SleepingBeautySvelte.svelte';

const SleepingBeautyWrapper = () => {
  const svelteContainerRef = useRef(null);
  const svelteComponent = useRef(null);

  useEffect(() => {
    if (svelteContainerRef.current) {
      svelteComponent.current = new SleepingBeautyComponent({
        target: svelteContainerRef.current
      });

      return () => {
        if (svelteComponent.current) {
          svelteComponent.current.$destroy();
        }
      };
    }
  }, []);

  return <div ref={svelteContainerRef}></div>;
};

export default SleepingBeautyWrapper;