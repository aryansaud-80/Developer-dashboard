import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const ShortBreakTimer = ({ play, onEnd }) => {
  const { shortBreak } = useContext(AppContext);
  const [secondsLeft, setSecondsLeft] = useState(shortBreak * 60);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!play) {
      setSecondsLeft(secondsLeft);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [shortBreak, play]);

  useEffect(() => {
    if (play && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    if (!play && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [play]);

    useEffect(() => {
    if (secondsLeft === 0) {
      onEnd();
    }
  }, [secondsLeft, onEnd]);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (secondsLeft % 60).toString().padStart(2, '0');

  return (
    <div className='text-5xl sm:text-6xl md:text-7xl font-bold tracking-wide text-gray-900'>
      {`${minutes}:${seconds}`}
    </div>
  );
};

export default ShortBreakTimer;
