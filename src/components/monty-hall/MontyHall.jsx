import { useState } from 'react';
import { Link } from 'react-router-dom';
import IntroScreen from './IntroScreen';
import GameScene from './GameScene';
import Explanation from './Explanation';
import '../../App.css';

const MontyHall = () => {
  const [gameState, setGameState] = useState('intro'); // intro, playing, explanation
  const [gameResult, setGameResult] = useState(null);

  const handleIntroComplete = () => {
    setGameState('playing');
  };

  const handleGameOver = (hasWon, didSwitch) => {
    setGameResult({ hasWon, didSwitch });
    setGameState('explanation');
  };

  const handlePlayAgain = () => {
    setGameState('playing');
    setGameResult(null);
  };

  return (
    <div className="relative min-h-screen bg-gray-900">
      <Link 
        to="/" 
        className="absolute top-4 left-4 text-white hover:text-blue-300 transition-colors z-50"
      >
        ← Back to Home
      </Link>
      
      {gameState === 'intro' && <IntroScreen onComplete={handleIntroComplete} />}
      
      {gameState === 'playing' && <GameScene onGameOver={handleGameOver} />}
      
      {gameState === 'explanation' && gameResult && (
        <Explanation
          hasWon={gameResult.hasWon}
          didSwitch={gameResult.didSwitch}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
};

export default MontyHall;