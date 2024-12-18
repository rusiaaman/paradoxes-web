import React, { useState, useEffect } from 'react';

const TypeWriter = ({
  text,
  typing,
  onComplete,
  id,
  speed = 'normal'
}) => {
  const [displayText, setDisplayText] = useState('');

  const getTypingInterval = () => {
    const baseSpeed = {
      slow: 80,
      normal: 50,
      fast: 30
    }[speed] || 50;
    return baseSpeed;
  };

  useEffect(() => {
    if (!typing) return;
    
    setDisplayText('');
    let currentIndex = 0;
    const interval = getTypingInterval();
    
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        currentIndex++;
        setDisplayText(text.slice(0, currentIndex));
      } else {
        clearInterval(timer);
        onComplete?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [text, typing, speed, onComplete]);

  return (
    <span className="inline-block min-h-[1.5em]">
      {typing ? displayText : text}
    </span>
  );
};

export default TypeWriter;