import React, { useEffect, useRef, useCallback, useState } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';

function NarrationText({ text, onComplete, skipTyping, setSkipTyping }) {
  const elementRef = useRef(null);
  const typedRef = useRef(null);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isSkippable, setIsSkippable] = useState(true);

  // Cleanup function to handle proper teardown
  const cleanup = useCallback(() => {
    if (typedRef.current) {
      typedRef.current.destroy();
      typedRef.current = null;
    }
  }, []);

  // Handle completion of typing
  const handleComplete = useCallback(() => {
    setHasCompleted(true);
    setIsSkippable(false);
    onComplete?.();
  }, [onComplete]);

  // Handle skipping of typing animation
  const handleSkip = useCallback((e) => {
    if (!typedRef.current || !isSkippable) return;
    
    e.stopPropagation();
    cleanup();
    
    if (elementRef.current) {
      elementRef.current.innerHTML = text;
    }
    
    handleComplete();
  }, [text, cleanup, handleComplete, isSkippable]);

  useEffect(() => {
    if (!elementRef.current || hasCompleted) return;

    cleanup(); // Clean up any existing instance
    setIsSkippable(true);

    // If skipTyping is true, show the text immediately
    if (skipTyping) {
      elementRef.current.innerHTML = text;
      handleComplete();
      return;
    }

    // Initialize new typing instance with improved settings
    typedRef.current = new Typed(elementRef.current, {
      strings: [text],
      typeSpeed: 35,
      showCursor: true,
      cursorChar: '▎',
      loop: false,
      onComplete: handleComplete,
      startDelay: 400,
      smartBackspace: true,
      backSpeed: 30,
      backDelay: 700,
      fadeOut: true,
      fadeOutDelay: 100,
    });

    // Add click listener for skipping
    document.addEventListener('click', handleSkip);

    return () => {
      cleanup();
      document.removeEventListener('click', handleSkip);
    };
  }, [text, skipTyping, handleComplete, handleSkip, cleanup]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative px-4 pb-6 md:pb-8"
    >
      <div 
        ref={elementRef}
        className="text-lg md:text-xl text-white/90 font-medium leading-relaxed tracking-wide"
        style={{ 
          minHeight: '6rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          maxWidth: '70ch',
          margin: '0 auto',
        }}
      />
      {isSkippable && !skipTyping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-0 right-0 text-sm text-white/50 italic"
        >
          Click anywhere to skip
        </motion.div>
      )}
    </motion.div>
  );
}

export default NarrationText;