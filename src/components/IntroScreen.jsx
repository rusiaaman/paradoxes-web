import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const IntroScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const fadeOut = useSpring({
    opacity: isVisible ? 1 : 0,
    config: { duration: 1000 }
  });

  return (
    <animated.div 
      style={{ ...fadeIn, ...fadeOut }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800"
    >
      <div 
        className="text-center p-8 rounded-2xl bg-black/30 backdrop-blur-sm 
                   border border-white/10 shadow-2xl transform"
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75"></div>
          <div className="relative p-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Welcome to
            </h1>
            <h2 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text 
                          bg-gradient-to-r from-purple-400 to-pink-600 mt-2">
              The Monty Hall Game
            </h2>
          </div>
        </div>
        <p className="mt-6 text-gray-300 text-lg md:text-xl">
          Are you ready to test your probability skills?
        </p>
        <div className="mt-8 animate-pulse">
          <p className="text-gray-400 text-sm">Starting in a moment...</p>
        </div>
      </div>
    </animated.div>
  );
};

export default IntroScreen;