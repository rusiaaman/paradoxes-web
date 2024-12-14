import { useSpring, animated } from '@react-spring/web';
import ReactConfetti from 'react-confetti';
import { useState, useEffect } from 'react';

const Explanation = ({ hasWon, didSwitch, onPlayAgain }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 20 }
  });

  return (
    <animated.div 
      style={fadeIn}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-95"
    >
      {hasWon && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
          colors={['#FFD700', '#FFA500', '#FF69B4', '#00FF00', '#4169E1']}
        />
      )}
      <div className="max-w-2xl p-8 bg-gray-800 rounded-xl text-white">
        <h2 className="text-4xl font-bold mb-6 text-center">
          {hasWon ? '🎉 Congratulations!' : '😔 Better luck next time!'}
        </h2>
        
        <div className="space-y-4 text-lg">
          <p>
            You {didSwitch ? 'switched' : 'stayed'} and {hasWon ? 'won' : 'lost'}!
          </p>
          
          <div className="my-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-xl font-bold mb-3">The Mathematics Behind It:</h3>
            <p className="mb-3">
              When you first choose a door, your probability of picking the car is 1/3,
              meaning the probability that the car is behind one of the other doors is 2/3.
            </p>
            <p className="mb-3">
              When Monty opens a door with a goat (which he always can and will do),
              all of that 2/3 probability transfers to the remaining unopened door.
            </p>
            <p>
              Therefore, switching doors gives you a 2/3 chance of winning,
              while staying with your original choice maintains your initial 1/3 probability.
            </p>
          </div>
          
          <p className="text-center text-xl">
            Switching doors doubles your chances of winning!
          </p>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onPlayAgain}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-bold"
          >
            Play Again
          </button>
        </div>
      </div>
    </animated.div>
  );
};

export default Explanation;