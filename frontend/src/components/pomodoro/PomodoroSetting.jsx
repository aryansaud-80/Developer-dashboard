import TimeSetting from "./TimeSetting";
import SettingIcon from "../../assets/icons/SettingIcon";
import TimeIcon from "../../assets/icons/TimeIcon";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const PomodoroSetting = () => {
  const { isSettingOpen, setIsSettingOpen } = useContext(AppContext);

  return (
    <div className="relative">
      <div className="flex justify-between items-center min-w-lg p-3 z-0">
        <span className="gap-1 font-medium text-lg items-center hidden sm:flex" style={{ color: "var(--text-primary)" }}>
          <TimeIcon />
          Pomodoro
        </span>
        <button
          onClick={() => setIsSettingOpen(true)}
          className="p-2 rounded-full max-md:absolute max-md:right-10 max-md:top-4"
          style={{ backgroundColor: "var(--bg-hover)", color: "var(--text-primary)" }}
        >
          <SettingIcon />
        </button>
      </div>

      {isSettingOpen && (
        <>
          <div
            className="fixed inset-0 z-20 pointer-events-auto"
            style={{ backgroundColor: "var(--bg-overlay)" }}
            onClick={() => setIsSettingOpen(false)}
          />
          <style>{"body { overflow: hidden; }"}</style>
          <div className="inset-0 flex justify-center items-center z-30 pointer-events-auto">
            <TimeSetting onClose={() => setIsSettingOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
};

export default PomodoroSetting;
