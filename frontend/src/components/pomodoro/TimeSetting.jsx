import { useContext } from "react";
import XIcon from "../../assets/icons/XIcon";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const TimeSetting = ({ onClose }) => {
  const {
    workTime,
    setWorkTime,
    shortBreak,
    setShortBreak,
    longBreak,
    setLongBreak,
  } = useContext(AppContext);

  // Check if any timer is set to 0
  const hasInvalidTime = workTime <= 0 || shortBreak <= 0 || longBreak <= 0;

  const handleClose = () => {
    if (hasInvalidTime) {
      toast.error("All timer values must be greater than 0");
      return;
    }
    onClose();
  };

  const handleSave = () => {
    // Validate all times are greater than 0
    if (workTime <= 0) {
      toast.error("Work time must be greater than 0 minutes");
      return;
    }
    if (shortBreak <= 0) {
      toast.error("Short break must be greater than 0 minutes");
      return;
    }
    if (longBreak <= 0) {
      toast.error("Long break must be greater than 0 minutes");
      return;
    }

    toast.success("Timer settings saved!");
    onClose();
  };

  const handleWorkTimeChange = (value) => {
    const numValue = Number(value);
    if (numValue >= 0 && numValue <= 120) {
      setWorkTime(numValue);
    }
  };

  const handleShortBreakChange = (value) => {
    const numValue = Number(value);
    if (numValue >= 0 && numValue <= 60) {
      setShortBreak(numValue);
    }
  };

  const handleLongBreakChange = (value) => {
    const numValue = Number(value);
    if (numValue >= 0 && numValue <= 120) {
      setLongBreak(numValue);
    }
  };

  return (
    <div className="w-96 bg-white p-4 rounded-md shadow-lg z-40 text-gray-700">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">TIMER SETTING</h1>
        <button
          onClick={handleClose}
          disabled={hasInvalidTime}
          className="disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 p-1 rounded transition"
          title={
            hasInvalidTime ? "All timer values must be greater than 0" : "Close"
          }
        >
          <XIcon />
        </button>
      </div>

      <div className="w-full h-0.5 bg-gray-300 mt-2" />

      {hasInvalidTime && (
        <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
          ⚠️ All timer values must be greater than 0 minutes
        </div>
      )}

      <div className="flex justify-between mt-6 max-sm:flex-col max-sm:gap-3">
        <div className="flex flex-col">
          <label htmlFor="workTime" className="text-sm font-semibold mb-1">
            Work
          </label>
          <input
            id="workTime"
            type="number"
            min="1"
            max="120"
            value={workTime}
            onChange={(e) => handleWorkTimeChange(e.target.value)}
            className={`w-20 p-1 text-center bg-gray-300 text-black outline-0 rounded-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] ${
              workTime <= 0 ? "ring-2 ring-red-500" : ""
            }`}
          />
          <span className="text-xs text-gray-500 mt-1">minutes</span>
          {workTime <= 0 && (
            <span className="text-xs text-red-600 mt-1">Must be &gt; 0</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="shortBreak" className="text-sm font-semibold mb-1">
            Short Break
          </label>
          <input
            id="shortBreak"
            type="number"
            min="1"
            max="60"
            value={shortBreak}
            onChange={(e) => handleShortBreakChange(e.target.value)}
            className={`w-20 p-1 text-center bg-gray-300 text-black outline-0 rounded-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] ${
              shortBreak <= 0 ? "ring-2 ring-red-500" : ""
            }`}
          />
          <span className="text-xs text-gray-500 mt-1">minutes</span>
          {shortBreak <= 0 && (
            <span className="text-xs text-red-600 mt-1">Must be &gt; 0</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="longBreak" className="text-sm font-semibold mb-1">
            Long Break
          </label>
          <input
            id="longBreak"
            type="number"
            min="1"
            max="120"
            value={longBreak}
            onChange={(e) => handleLongBreakChange(e.target.value)}
            className={`w-20 p-1 text-center bg-gray-300 text-black outline-0 rounded-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] ${
              longBreak <= 0 ? "ring-2 ring-red-500" : ""
            }`}
          />
          <span className="text-xs text-gray-500 mt-1">minutes</span>
          {longBreak <= 0 && (
            <span className="text-xs text-red-600 mt-1">Must be &gt; 0</span>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={hasInvalidTime}
          className="bg-slate-700 text-white px-6 py-2 rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-500"
          title={
            hasInvalidTime
              ? "All timer values must be greater than 0"
              : "Save settings"
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TimeSetting;
