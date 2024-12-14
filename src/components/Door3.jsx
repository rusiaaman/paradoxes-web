import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';

const Door = ({ number, isOpen, hasCar, isSelected, onSelect, isSelectable }) => {
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({
    rotateY: isOpen ? -105 : 0,
    scale: isHovered && isSelectable ? 1.05 : 1,
    config: { tension: 120, friction: 14 }
  });

  return (
    <div className="relative w-64 h-96">
      {/* Background wall with content */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
        {isOpen && (
          <div className="text-center">
            {hasCar ? (
              <div className="relative scale-150">
                <div className="absolute -inset-8 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="text-8xl transform animate-bounce-slow">🚗</div>
                <div className="mt-4 text-yellow-400 font-bold text-xl">Grand Prize!</div>
              </div>
            ) : (
              <div className="relative scale-150">
                <div className="absolute -inset-8 bg-gray-400/10 rounded-full blur-xl"></div>
                <div className="text-8xl transform animate-bounce">🐐</div>
                <div className="mt-4 text-gray-400 font-bold text-xl">Baaa!</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* The door itself */}
      <animated.div
        style={{
          position: 'absolute',
          inset: 0,
          transformOrigin: 'left',
          transform: springProps.rotateY.to(
            r => `perspective(1500px) rotateY(${r}deg) scale(${springProps.scale.get()})`
          ),
        }}
        className={`${isSelectable ? 'cursor-pointer' : 'cursor-default'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => isSelectable && onSelect(number)}
      >
        {/* Front of door */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-800 to-amber-950 
                      rounded-lg border-4 border-amber-700/80 shadow-xl">
          {/* Door panel design */}
          <div className="absolute inset-4 grid grid-cols-2 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-amber-900/50 rounded shadow-inner"></div>
            ))}
          </div>
          
          {/* Door number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-amber-100">{number}</span>
          </div>
          
          {/* Door knob */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-amber-300 rounded-full shadow-lg">
              <div className="absolute inset-1 bg-amber-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Back of door */}
        <div className="absolute inset-0 bg-amber-900/80 rounded-lg border-2 border-amber-800"
             style={{ 
               backfaceVisibility: 'hidden',
               transform: 'rotateY(180deg)',
             }}>
        </div>
      </animated.div>
    </div>
  );
};

export default Door;