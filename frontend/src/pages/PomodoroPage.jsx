import AboutPomodoro from '../components/pomodoro/AboutPomodoro';
import Pomodoro from '../components/pomodoro/Pomodoro';
import PomodoroSetting from '../components/pomodoro/PomodoroSetting';

const PomodoroPage = () => {
  return (
    <section className='md:ml-64 flex flex-col justify-center max-md:w-screen'>
      <PomodoroSetting />
      <Pomodoro />
      <AboutPomodoro />
    </section>
  );
};

export default PomodoroPage;
