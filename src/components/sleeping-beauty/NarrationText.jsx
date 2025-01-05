import React, { useEffect, useRef, useCallback, useState, useLayoutEffect } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';

function NarrationText({ text, onComplete, skipTyping, setSkipTyping }) {
  const elementRef = useRef(null);
  const typedRef = useRef(null);
  const finalTextRef = useRef('');
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);
  
  // Update onComplete ref when prop changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Ensure display text stays visible
  useLayoutEffect(() => {
    if (isComplete && finalTextRef.current && !displayText) {
      setDisplayText(finalTextRef.current);
    }
  }, [displayText, isComplete]);

  const handleTypingComplete = useCallback((self) => {
    if (self?.cursor) {
      self.cursor.style.display = 'none';
    }
    
    finalTextRef.current = text;
    setDisplayText(text);
    setIsComplete(true);
    
    // Call onComplete in next frame to ensure state is settled
    requestAnimationFrame(() => {
      onCompleteRef.current?.();
    });
  }, [text]);

  const handleSkip = useCallback((e) => {
    if (isComplete || !typedRef.current) return;

    e.stopPropagation();
    
    // Cleanup typed instance first
    if (typedRef.current) {
      typedRef.current.destroy();
      typedRef.current = null;
    }
    
    // Then complete
    handleTypingComplete();
  }, [handleTypingComplete, isComplete]);

  useLayoutEffect(() => {
    // If already complete, maintain text visibility
    if (isComplete) {
      setDisplayText(finalTextRef.current);
      return;
    }

    // Handle skip request
    if (skipTyping) {
      finalTextRef.current = text;
      setDisplayText(text);
      setIsComplete(true);
      onCompleteRef.current?.();
      return;
    }

    // Start new typing animation
    if (elementRef.current && text) {
      const typed = new Typed(elementRef.current, {
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

      typedRef.current = typed;

      // Add skip handler
      document.addEventListener('click', handleSkip);
    }

    // Cleanup
    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
        typedRef.current = null;
      }
      document.removeEventListener('click', handleSkip);
    };
  }, [text, skipTyping, handleTypingComplete, handleSkip, isComplete]);

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
        dangerouslySetInnerHTML={{ __html: displayText }}
      />
      {!isComplete && !skipTyping && (
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