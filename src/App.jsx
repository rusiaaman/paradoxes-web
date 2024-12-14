import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import IntroScreen from './components/IntroScreen';
import GameScene from './components/GameScene';
import Explanation from './components/Explanation';
import './App.css';

const App = () => {
  const [gameState, setGameState] = useState('intro'); // intro, playing, explanation
  const [gameResult, setGameResult] = useState(null);

  // Sound effects will be added later

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
    <div className="min-h-screen bg-gray-900">
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

export default App;
