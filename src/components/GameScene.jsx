import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Door from './Door3';
import { initializeGame, getMontyChoice, getOtherDoor, determineWinner } from '../utils/game-logic';

const GameScene = ({ onGameOver }) => {
  const [gameState, setGameState] = useState(initializeGame());
  const [message, setMessage] = useState("Choose a door! One has a car, the others have goats.");

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 }
  });

  const handleDoorSelect = (doorNumber) => {
    if (gameState.gamePhase !== 'initial') return;

    setGameState(prev => ({
      ...prev,
      playerChoice: doorNumber,
      gamePhase: 'doorSelected'
    }));

    setTimeout(() => {
      const montyDoor = getMontyChoice(gameState.doors, doorNumber);
      setGameState(prev => ({
        ...prev,
        doors: {
          ...prev.doors,
          [montyDoor]: { ...prev.doors[montyDoor], isOpen: true }
        },
        montyOpenedDoor: montyDoor,
        gamePhase: 'montyRevealed'
      }));
      setMessage("Would you like to switch to the other door?");
    }, 1500);
  };

  const handleFinalChoice = (shouldSwitch) => {
    if (gameState.gamePhase !== 'montyRevealed') return;

    const finalDoorChoice = shouldSwitch
      ? getOtherDoor(gameState.doors, gameState.playerChoice, gameState.montyOpenedDoor)
      : gameState.playerChoice;

    // Open the chosen door first
    setGameState(prev => ({
      ...prev,
      finalChoice: finalDoorChoice,
      doors: {
        ...prev.doors,
        [finalDoorChoice]: { ...prev.doors[finalDoorChoice], isOpen: true }
      },
      gamePhase: 'revealing'
    }));

    const hasWon = determineWinner(gameState.doors, finalDoorChoice);

    // After a delay, open all remaining doors
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        doors: Object.entries(prev.doors).reduce((acc, [key, door]) => ({
          ...acc,
          [key]: { ...door, isOpen: true }
        }), {}),
        gamePhase: 'gameOver'
      }));

      setTimeout(() => {
        onGameOver(hasWon, shouldSwitch);
      }, 1000);
    }, 1500);
  };

  return (
    <animated.div style={fadeIn} className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 relative">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75"></div>
            <h2 className="relative text-3xl md:text-4xl font-bold mb-4 p-4 bg-gray-900 rounded-lg">
              {message}
            </h2>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
          {Object.entries(gameState.doors).map(([number, door]) => (
            <Door
              key={number}
              number={parseInt(number)}
              isOpen={door.isOpen}
              hasCar={door.hasCar}
              isSelected={parseInt(number) === gameState.playerChoice}
              isSelectable={gameState.gamePhase === 'initial'}
              onSelect={handleDoorSelect}
            />
          ))}
        </div>

        {gameState.gamePhase === 'montyRevealed' && (
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => handleFinalChoice(false)}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 
                         hover:from-blue-500 hover:to-blue-600 rounded-xl text-white font-bold
                         transform transition-all duration-200 hover:scale-105 
                         shadow-lg hover:shadow-blue-500/50"
            >
              <div className="absolute -inset-1 bg-blue-600 rounded-xl blur opacity-30 
                            group-hover:opacity-50 transition-opacity"></div>
              <span className="relative">Stay with Door {gameState.playerChoice}</span>
            </button>
            <button
              onClick={() => handleFinalChoice(true)}
              className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-green-700
                         hover:from-green-500 hover:to-green-600 rounded-xl text-white font-bold
                         transform transition-all duration-200 hover:scale-105
                         shadow-lg hover:shadow-green-500/50"
            >
              <div className="absolute -inset-1 bg-green-600 rounded-xl blur opacity-30
                            group-hover:opacity-50 transition-opacity"></div>
              <span className="relative">Switch Door</span>
            </button>
          </div>
        )}
      </div>
    </animated.div>
  );
};

export default GameScene;