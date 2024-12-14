import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';

const Door = ({ number, isOpen, hasCar, isSelected, onSelect, isSelectable }) => {
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({
    transform: isOpen 
      ? 'rotateY(-105deg) scale(1)'
      : `rotateY(0deg) scale(${isHovered && isSelectable ? 1.05 : 1})`,
    config: { tension: 120, friction: 14 }
  });

  const glowProps = useSpring({
    boxShadow: isSelected
      ? '0 0 20px rgba(234, 179, 8, 0.5)'
      : '0 0 0px rgba(234, 179, 8, 0)',
    config: config.gentle
  });

  return (
    <div className="relative w-64 h-96 mx-auto" style={{ perspective: '1500px' }}>
      {/* Content behind the door */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
        {isOpen && (
          <div className="text-center transform scale-150">
            {hasCar ? (
              <div className="relative">
                <div className="absolute -inset-8 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="text-8xl">🚗</div>
                <div className="text-lg text-yellow-400 font-bold mt-4">You win!</div>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute -inset-8 bg-gray-400/10 rounded-full blur-xl"></div>
                <div className="text-8xl animate-bounce">🐐</div>
                <div className="text-lg text-gray-400 font-bold mt-4">Baaa!</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Door */}
      <animated.div
        style={{
          ...springProps,
          ...glowProps,
          transformOrigin: 'left',
          transformStyle: 'preserve-3d',
          position: 'absolute',
          inset: 0,
        }}
        className={`w-full h-full ${isSelectable ? 'cursor-pointer' : 'cursor-default'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => isSelectable && onSelect(number)}
      >
        {/* Front of the door */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-800 to-yellow-950 
                    rounded-lg border-4 border-yellow-700 shadow-xl">
          {/* Door Frame */}
          <div className="absolute inset-2 border-2 border-yellow-600/30 rounded"></div>
          
          {/* Door Panels */}
          <div className="absolute inset-4 grid grid-cols-2 gap-2">
            <div className="bg-yellow-900/50 rounded shadow-inner"></div>
            <div className="bg-yellow-900/50 rounded shadow-inner"></div>
            <div className="bg-yellow-900/50 rounded shadow-inner"></div>
            <div className="bg-yellow-900/50 rounded shadow-inner"></div>
          </div>
          
          {/* Door Number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-yellow-600/20 rounded-full blur-sm"></div>
              <span className="relative text-5xl font-bold text-yellow-100">
                {number}
              </span>
            </div>
          </div>
          
          {/* Door Knob */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8">
            <div className="absolute inset-0 bg-yellow-300 rounded-full shadow-lg"></div>
            <div className="absolute inset-1 bg-yellow-400 rounded-full"></div>
          </div>
        </div>

        {/* Back of the door (inner side) */}
        <div className="absolute inset-0 bg-yellow-900/80 rounded-lg border-2 border-yellow-800"
             style={{ transform: 'rotateY(180deg) translateZ(1px)' }}>
        </div>

        {/* Room/wall behind the door */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900"
          style={{ 
            transform: 'translateZ(-1px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {isOpen && (
            <div className="text-center transform scale-[200%] transition-all duration-500"
                 style={{ transform: 'translateZ(0) scale(2)' }}>
              <div className="fixed-content">
                {hasCar ? (
                  <div className="relative">
                    <div className="absolute -inset-8 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="text-8xl" style={{ filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.5))' }}>🚗</div>
                    <div className="text-lg text-yellow-400 font-bold mt-4">You win!</div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute -inset-8 bg-gray-400/10 rounded-full blur-xl"></div>
                    <div className="text-8xl animate-bounce">🐐</div>
                    <div className="text-lg text-gray-400 font-bold mt-4">Baaa!</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </animated.div>
    </div>
  );
};

export default Door;