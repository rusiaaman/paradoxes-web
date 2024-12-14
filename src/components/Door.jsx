import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';

const Door = ({ number, isOpen, hasCar, isSelected, onSelect, isSelectable }) => {
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({
    transform: `
      perspective(1000px)
      rotateY(${isOpen ? -105 : 0}deg)
      scale(${isHovered && isSelectable ? 1.05 : 1})
    `,
    config: { ...config.gentle }
  });

  const [isHovered, setIsHovered] = useState(false);

  const doorSpring = useSpring({
    transform: isOpen 
      ? 'perspective(1000px) rotateY(-70deg)'
      : 'perspective(1000px) rotateY(0deg)',
    scale: isHovered && isSelectable ? 1.05 : 1,
    config: { tension: 180, friction: 12 }
  });

  return (
    <animated.div 
      style={doorSpring}
      className={`relative w-64 h-96 ${isSelectable ? 'cursor-pointer' : 'cursor-default'} 
                  ${isSelected ? 'ring-4 ring-yellow-400' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => isSelectable && onSelect(number)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-amber-800 to-amber-950 
                      rounded-lg border-4 border-amber-700/80 shadow-xl transform 
                      transition-transform duration-300 ease-out">
        {/* Door Frame */}
        <div className="absolute inset-2 border-2 border-amber-600/30 rounded-md"></div>
        
        {/* Door Panels */}
        <div className="absolute inset-4 grid grid-cols-2 gap-2">
          <div className="bg-amber-900/50 rounded"></div>
          <div className="bg-amber-900/50 rounded"></div>
          <div className="bg-amber-900/50 rounded"></div>
          <div className="bg-amber-900/50 rounded"></div>
        </div>
        
        {/* Door Knob */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6">
          <div className="absolute inset-0 bg-amber-300 rounded-full shadow-lg"></div>
          <div className="absolute inset-1 bg-amber-400 rounded-full"></div>
        </div>
        
        {/* Door Number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-2 bg-amber-600/20 rounded-full blur-sm"></div>
            <span className="relative text-4xl font-bold text-amber-100">
              {number}
            </span>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10 flex items-center justify-center 
                      bg-gradient-to-b from-gray-800 to-gray-900">
        {isOpen && (
          <div className="text-center transform scale-150 transition-transform duration-500">
            {hasCar ? (
              <div className="relative">
                <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-md animate-pulse"></div>
                <div className="text-6xl transform hover:scale-110 transition-transform">🚗</div>
                <div className="mt-2 text-yellow-400 font-bold">Grand Prize!</div>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute -inset-4 bg-gray-400/10 rounded-full blur-md"></div>
                <div className="text-6xl transform hover:scale-110 transition-transform">🐐</div>
                <div className="mt-2 text-gray-400 font-bold">Better luck next time!</div>
              </div>
            )}
          </div>
        )}
      </div>
    </animated.div>
  );
};

export default Door;