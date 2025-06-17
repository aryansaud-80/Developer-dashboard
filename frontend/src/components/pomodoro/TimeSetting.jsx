import { useContext } from 'react';
import XIcon from '../../assets/icons/XIcon';
import { AppContext } from '../../context/AppContext';

const TimeSetting = ({ onClose }) => {
  const {
    workTime,
    setWorkTime,
    shortBreak,
    setShortBreak,
    longBreak,
    setLongBreak,
  } = useContext(AppContext);

  const handleSave = () => {
    onClose();
  };

  return (
    <div className='w-96 bg-white p-4 rounded-md shadow-lg z-40 text-gray-700'>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-bold'>TIMER SETTING</h1>
        <button onClick={onClose}>
          <XIcon />
        </button>
      </div>

      <div className='w-full h-0.5 bg-gray-300 mt-2' />

      <div className='flex justify-between mt-6'>
        <div className='flex flex-col'>
          <label htmlFor='workTime' className='text-sm font-semibold mb-1'>Work</label>
          <input
            id='workTime'
            type='number'
            value={workTime}
            onChange={(e) => setWorkTime(Number(e.target.value))}
            className='w-20 p-1 text-center bg-gray-300 text-black outline-0 rounded-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='shortBreak' className='text-sm font-semibold mb-1'>Short Break</label>
          <input
            id='shortBreak'
            type='number'
            value={shortBreak}
            onChange={(e) => setShortBreak(Number(e.target.value))}
            className='w-20 p-1 text-center bg-gray-300 text-black outline-0 rounded-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='longBreak' className='text-sm font-semibold mb-1'>Long Break</label>
          <input
            id='longBreak'
            type='number'
            value={longBreak}
            onChange={(e) => setLongBreak(Number(e.target.value))}
            className='w-20 p-1 text-center bg-gray-300 text-black outline-0 rounded-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]'
          />
        </div>
      </div>

      <div className='mt-8 flex justify-end'>
        <button
          onClick={handleSave}
          className='bg-slate-700 text-white px-6 py-2 rounded-md hover:bg-slate-800 transition-colors'
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TimeSetting;
