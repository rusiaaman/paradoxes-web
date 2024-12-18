import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

function NarrationText({ text, onComplete, skipTyping, setSkipTyping }) {
  const typedRef = useRef(null);
  const elementRef = useRef(null);
  const isTypingInitialized = useRef(false);

  useEffect(() => {
    if (!elementRef.current || isTypingInitialized.current) return;
    
    const options = {
      strings: [text],
      typeSpeed: 40,
      showCursor: true,
      cursorChar: '|',
      loop: false,
      onComplete: () => {
        if (onComplete) onComplete();
      }
    };

    typedRef.current = new Typed(elementRef.current, options);
    isTypingInitialized.current = true;

    const handleSkip = (e) => {
      if (!skipTyping && typedRef.current) {
        e.stopPropagation();
        setSkipTyping(true);
        typedRef.current.destroy();
        elementRef.current.innerHTML = text;
        if (onComplete) onComplete();
      }
    };

    elementRef.current.addEventListener('click', handleSkip);

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
      if (elementRef.current) {
        elementRef.current.removeEventListener('click', handleSkip);
      }
      isTypingInitialized.current = false;
    };
  }, [text, onComplete, skipTyping, setSkipTyping]);

  return (
    <div
      ref={elementRef}
      className='text-xl text-white font-semibold min-h-[100px] cursor-pointer leading-relaxed p-4'
    >
      {text}
    </div>
  );
}

export default NarrationText;