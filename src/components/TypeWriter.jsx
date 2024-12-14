import React, { useState, useEffect, useCallback } from 'react';

const TypeWriter = ({ text, typing, onComplete, id }) => {
  const [displayText, setDisplayText] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!typing || completed) return;
    setDisplayText('');
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        currentIndex++;
        setDisplayText(text.slice(0, currentIndex));
      } else {
        clearInterval(interval);
        setCompleted(true);
        onComplete?.();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, typing, onComplete, id]);

  // Reset completed state when text changes
  useEffect(() => {
    setCompleted(false);
  }, [text, id]);

  return <span>{typing ? displayText : text}</span>;
};

export default TypeWriter;