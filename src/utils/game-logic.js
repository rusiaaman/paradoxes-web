export const initializeGame = () => {
  const carPosition = Math.floor(Math.random() * 3) + 1;
  return {
    doors: {
      1: { hasCar: carPosition === 1, isOpen: false },
      2: { hasCar: carPosition === 2, isOpen: false },
      3: { hasCar: carPosition === 3, isOpen: false }
    },
    carPosition,
    playerChoice: null,
    montyOpenedDoor: null,
    finalChoice: null,
    gamePhase: 'initial' // initial -> doorSelected -> montyRevealed -> finalChoice -> gameOver
  };
};

export const getMontyChoice = (doors, playerChoice) => {
  const availableDoors = Object.entries(doors)
    .filter(([number, door]) => {
      return parseInt(number) !== playerChoice && !door.hasCar;
    })
    .map(([number]) => parseInt(number));
    
  return availableDoors[Math.floor(Math.random() * availableDoors.length)];
};

export const calculateWinProbability = (isSwitch) => {
  return isSwitch ? 2/3 : 1/3;
};

export const getOtherDoor = (doors, playerChoice, montyOpenedDoor) => {
  return Object.keys(doors)
    .map(Number)
    .find(num => num !== playerChoice && num !== montyOpenedDoor);
};

export const determineWinner = (doors, finalChoice) => {
  return doors[finalChoice].hasCar;
};