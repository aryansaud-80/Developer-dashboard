import { useState, useContext, useEffect } from "react";
import WorkTimer from "./WorkTimer";
import ShortBreakTimer from "./ShortBreakTimer";
import LongBreakTimer from "./LongBreakTimer";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { Play, Pause, RotateCcw, BarChart3 } from "lucide-react";
import axiosInstance from "../../utility/axios";

const Pomodoro = () => {
  const [sessionType, setSessionType] = useState("work");
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const [weeklyStats, setWeeklyStats] = useState(null);
  const [showStats, setShowStats] = useState(false);

  const { workTime, shortBreak, longBreak, pomodoroCount, setPomodoroCount } =
    useContext(AppContext);

  // Fetch weekly stats
  useEffect(() => {
    const fetchWeeklyStats = async () => {
      try {
        const { data } = await axiosInstance.get("/pomodoro/history?days=7");

        if (data.success) {
          setWeeklyStats(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch weekly stats:", error);
      }
    };

    fetchWeeklyStats();
  }, [pomodoroCount]);

  const savePomodoroSession = async (type, duration, completed = true) => {
    try {
      await axiosInstance.post("/pomodoro/save", {
        sessionType: type,
        duration,
        completed,
      });
    } catch (error) {
      console.error("Failed to save pomodoro session:", error);
      toast.error("Failed to save session");
    }
  };

  const handleSessionComplete = async () => {
    setIsPlaying(false);

    if (sessionType === "work") {
      await savePomodoroSession("work", workTime);
      setPomodoroCount((prev) => prev + 1);
      if (pomodoroCount + 1 >= 4) {
        setSessionType("longBreak");
        toast.info("Great work! Time for a long break!");
        setPomodoroCount(0);
      } else {
        setSessionType("shortBreak");
        toast.info("Nice! Take a short break!");
      }
    } else if (sessionType === "shortBreak") {
      await savePomodoroSession("shortBreak", shortBreak);
      setSessionType("work");
      toast.info("Break over! Ready to work?");
    } else {
      await savePomodoroSession("longBreak", longBreak);
      setSessionType("work");
      toast.info("Break finished! Let's get back to work!");
    }

    setKey((prev) => prev + 1);
  };

  const handleStart = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setKey((prev) => prev + 1);
  };

  const handleSessionChange = (type) => {
    setSessionType(type);
    setKey((prev) => prev + 1);
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen gap-8 px-4 py-8">
      {/* Stats Modal */}
      {showStats && weeklyStats && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-lg p-6 max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Weekly Pomodoro Report
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-3xl font-bold text-blue-600">
                  {weeklyStats.totalSessions}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Time</p>
                <p className="text-3xl font-bold text-green-600">
                  {Math.round(weeklyStats.totalMinutes)} min
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Work Sessions</p>
                <p className="text-3xl font-bold text-orange-600">
                  {weeklyStats.workSessions}
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Break Sessions</p>
                <p className="text-3xl font-bold text-purple-600">
                  {weeklyStats.breakSessions}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowStats(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl">
        {/* Session Type Tabs */}
        <div className="flex gap-4 mb-8 justify-center flex-wrap">
          {[
            { id: "work", label: "Work", color: "bg-red-500" },
            {
              id: "shortBreak",
              label: "Short Break",
              color: "bg-green-500",
            },
            { id: "longBreak", label: "Long Break", color: "bg-blue-500" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleSessionChange(tab.id)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                sessionType === tab.id
                  ? `${tab.color} text-white`
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          {sessionType === "work" && (
            <WorkTimer
              key={key}
              play={isPlaying}
              onEnd={handleSessionComplete}
            />
          )}
          {sessionType === "shortBreak" && (
            <ShortBreakTimer
              key={key}
              play={isPlaying}
              onEnd={handleSessionComplete}
            />
          )}
          {sessionType === "longBreak" && (
            <LongBreakTimer
              key={key}
              play={isPlaying}
              onEnd={handleSessionComplete}
            />
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 justify-center flex-wrap mb-8">
          <button
            onClick={handleStart}
            disabled={isPlaying}
            className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition flex gap-2 items-center"
          >
            <Play size={20} /> Start
          </button>
          <button
            onClick={handlePause}
            disabled={!isPlaying}
            className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition flex gap-2 items-center"
          >
            <Pause size={20} /> Pause
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition flex gap-2 items-center"
          >
            <RotateCcw size={20} /> Reset
          </button>
          <button
            onClick={() => setShowStats(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition flex gap-2 items-center"
          >
            <BarChart3 size={20} /> Stats
          </button>
        </div>

        {/* Pomodoro Counter */}
        <div className="text-center">
          <p className="text-gray-600 text-lg">
            Pomodoros Today:{" "}
            <span className="font-bold text-2xl text-indigo-600">
              {pomodoroCount}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pomodoro;