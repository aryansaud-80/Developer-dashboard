import TimeSetting from './TimeSetting';
import SettingIcon from '../../assets/icons/SettingIcon';
import TimeIcon from '../../assets/icons/TimeIcon';
import { useContext} from 'react';
import { AppContext } from '../../context/AppContext';

const PomodoroSetting = () => {
  const { isSettingOpen, setIsSettingOpen } = useContext(AppContext);

  return (
    <div className='relative'>
      <div className='flex justify-between items-center min-w-lg p-3 z-0'>
        <span className='gap-1 font-medium text-lg items-center hidden sm:flex'>
          <TimeIcon />
          Pomodoro
        </span>

        <button
          onClick={() => setIsSettingOpen(true)}
          className='bg-gray-200 p-2 rounded-full max-md:absolute max-md:right-10 max-md:top-4'
        >
          <SettingIcon />
        </button>
      </div>

      {isSettingOpen && (
        <>
          <div
            className='fixed inset-0 bg-transparent z-20 pointer-events-auto'
            onClick={() => setIsSettingOpen(false)}
          ></div>

          <style>{`body { overflow: hidden; }`}</style>

          <div className=' inset-0  flex justify-center items-center z-30 pointer-events-auto'>
            <TimeSetting onClose={() => setIsSettingOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
};

export default PomodoroSetting;
