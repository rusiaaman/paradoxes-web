import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

const useSound = () => {
  const soundsRef = useRef({});

  useEffect(() => {
    soundsRef.current = {
      intro: new Howl({ src: ['/sounds/intro.mp3'] }),
      select: new Howl({ src: ['/sounds/select.mp3'] }),
      open: new Howl({ src: ['/sounds/open.mp3'] }),
      win: new Howl({ src: ['/sounds/win.mp3'] }),
      lose: new Howl({ src: ['/sounds/lose.mp3'] })
    };

    // Cleanup on unmount
    return () => {
      Object.values(soundsRef.current).forEach(sound => sound.unload());
    };
  }, []);

  const play = (soundName) => {
    if (soundsRef.current[soundName]) {
      soundsRef.current[soundName].play();
    }
  };

  return { play };
};

export default useSound;