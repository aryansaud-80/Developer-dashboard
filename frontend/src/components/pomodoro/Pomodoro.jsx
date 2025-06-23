import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import WorkTimer from './WorkTimer';
import ShortBreakTimer from './ShortBreakTimer';
import LongBreakTimer from './LongBreakTimer';

const Pomodoro = () => {
  const { setWorkTime, setLongBreak, setShortBreak } = useContext(AppContext);

  const [activeSession, setActiveSession] = useState('Work');
  const [play, setPlay] = useState(false);
  const [sessionCount, setSessionCount] = useState(
    Number(localStorage.getItem('sessionCount')) || 0
  );
  const [key, setKey] = useState(0);

  const handleSessionChange = (session) => {
    setActiveSession(session);
    setPlay(false);
    setKey((prev) => prev + 1);
  };

  useEffect(() => {
    localStorage.setItem('sessionCount', sessionCount);
  }, [sessionCount]);

  const getStoredTime = (key, fallback) =>
    Number(localStorage.getItem(key)) || fallback;

  const handleReset = () => {
    if (activeSession === 'Work') {
      setWorkTime(getStoredTime('workTime', 25));
    } else if (activeSession === 'Short Break') {
      setShortBreak(getStoredTime('shortBreak', 5));
    } else if (activeSession === 'Long Break') {
      setLongBreak(getStoredTime('longBreak', 15));
    }
    setPlay(false);
  };

  const handleTimerEnd = () => {
    if (activeSession === 'Work') {
      const nextCount = sessionCount + 1;
      setSessionCount(nextCount);

      if (nextCount < 4) {
        setActiveSession('Short Break');
      } else {
        setActiveSession('Long Break');
        setSessionCount(0);
      }
    } else {
      setActiveSession('Work');
    }

    setPlay(false);
    setKey((prev) => prev + 1);
  };

  const renderTimer = () => {
    if (activeSession === 'Work')
      return <WorkTimer key={key} play={play} onEnd={handleTimerEnd} />;
    if (activeSession === 'Short Break')
      return <ShortBreakTimer key={key} play={play} onEnd={handleTimerEnd} />;
    if (activeSession === 'Long Break')
      return <LongBreakTimer key={key} play={play} onEnd={handleTimerEnd} />;
  };

  return (
    <div className='max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center  gap-10 h-screen mt-20'>
      <div className='flex flex-col md:flex-row justify-center gap-4'>
        {['Work', 'Short Break', 'Long Break'].map((item) => (
          <button
            key={item}
            onClick={() => handleSessionChange(item)}
            className={`px-4 py-2 text-lg rounded-md font-medium transition-colors ${
              activeSession === item
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {renderTimer()}

      <button
        className='bg-indigo-600 hover:bg-indigo-700 text-white text-2xl sm:text-3xl font-semibold px-10 py-3 rounded-md shadow transition'
        onClick={() => setPlay((prev) => !prev)}
      >
        {play ? 'Pause' : 'Start'}
      </button>

      <button
        className='bg-gray-200 text-lg font-medium py-2 px-5 rounded-md'
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};

export default Pomodoro;
