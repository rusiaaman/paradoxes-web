import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IntroStage from './stages/IntroStage';
import FirstAwakeningStage from './stages/FirstAwakeningStage';
import PerspectiveShiftStage from './stages/PerspectiveShiftStage';
import ExplanationStage from './stages/ExplanationStage';
import HistoryPanel from './HistoryPanel';
import '../../App.css';

const SleepingBeauty = () => {
  const [currentStage, setCurrentStage] = useState('intro');
  const [history, setHistory] = useState([]);
  const [probability, setProbability] = useState(null);

  const addToHistory = (message) => {
    setHistory(prev => [...prev, message]);
  };

  const [skipTyping, setSkipTyping] = useState(false);

  const stageComponents = {
    'intro': <IntroStage 
      onContinue={() => setCurrentStage('firstAwakening')} 
      skipTyping={skipTyping}
      setSkipTyping={setSkipTyping}
      addToHistory={addToHistory}
    />,
    'firstAwakening': <FirstAwakeningStage 
      onComplete={() => setCurrentStage('perspectiveShift')}
      skipTyping={skipTyping}
      setSkipTyping={setSkipTyping}
      addToHistory={addToHistory}
    />,
    'perspectiveShift': <PerspectiveShiftStage 
      onComplete={() => setCurrentStage('explanation')}
      skipTyping={skipTyping}
      setSkipTyping={setSkipTyping}
      onProbabilitySelect={setProbability}
      addToHistory={addToHistory}
    />,
    'explanation': <ExplanationStage 
      selectedProbability={probability}
      skipTyping={skipTyping}
      setSkipTyping={setSkipTyping}
      addToHistory={addToHistory}
    />
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Link 
        to="/" 
        className="absolute top-4 left-4 text-white hover:text-blue-300 transition-colors z-50"
      >
        ← Back to Home
      </Link>
      
      {stageComponents[currentStage]}
      
      {history.length > 0 && (
        <HistoryPanel history={history} />
      )}
    </div>
  );
};

export default SleepingBeauty;