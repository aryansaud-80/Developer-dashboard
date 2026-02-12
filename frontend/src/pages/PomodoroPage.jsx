import AboutPomodoro from "../components/pomodoro/AboutPomodoro";
import Pomodoro from "../components/pomodoro/Pomodoro";
import PomodoroSetting from "../components/pomodoro/PomodoroSetting";

const PomodoroPage = () => {
  return (
    <section className="page-container flex flex-col justify-center">
      <PomodoroSetting />
      <Pomodoro />
      <AboutPomodoro />
    </section>
  );
};

export default PomodoroPage;
