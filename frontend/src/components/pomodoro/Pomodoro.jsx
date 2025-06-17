import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const Pomodoro = () => {
  const {
    pomodoroCount,
    setPomodoroCount,
    workTime,
    setWorkTime,
    shortBreak,
    setShortBreak,
    longBreak,
    setLongBreak,
  } = useContext(AppContext);
  const [activeSession, setActiveSession] = useState('Work');
  const [play, setPlay] = useState(false);

  const handleSession = (item) => {
    setActiveSession(item);
  };

  const handlePlay = () => {
    setPlay(!play);
  };

  return (
    <div className='px-4 sm:px-6 md:px-8 py-10 flex flex-col items-center gap-10  w-full'>
      <div className='flex flex-col sm:flex-row justify-center gap-3'>
        {['Work', 'Short Break', 'Long Break'].map((item, i) => (
          <button
            key={i}
            onClick={() => handleSession(item)}
            className={`px-4 py-2 text-base sm:text-lg rounded-md font-medium transition-colors ${
              activeSession === item
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className='text-5xl sm:text-6xl md:text-7xl font-bold tracking-wide text-gray-900'>
        {`${workTime.toString().padStart(2, '0')}:00`}
      </div>

      <button
        className='bg-indigo-600 hover:bg-indigo-700 text-white text-xl sm:text-2xl md:text-3xl font-semibold px-8 sm:px-10 py-2 sm:py-3 rounded-md shadow transition'
        onClick={handlePlay}
      >
        {play ? 'Pause' : 'Start'}
      </button>
    </div>
  );
};

export default Pomodoro;
