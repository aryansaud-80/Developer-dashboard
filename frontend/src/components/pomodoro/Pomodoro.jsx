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

  useEffect(() => {
    const fetchWeeklyStats = async () => {
      try {
        const { data } = await axiosInstance.get("/pomodoro/history?days=7");
        if (data.success) setWeeklyStats(data.data);
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
    }
  };

  const handleSessionComplete = async () => {
    setIsPlaying(false);
    if (sessionType === "work") {
      await savePomodoroSession("work", workTime);
      setPomodoroCount((prev) => prev + 1);
      if (pomodoroCount + 1 >= 4) {
        setSessionType("longBreak");
        toast.info("Time for a long break!");
        setPomodoroCount(0);
      } else {
        setSessionType("shortBreak");
        toast.info("Take a short break!");
      }
    } else if (sessionType === "shortBreak") {
      await savePomodoroSession("shortBreak", shortBreak);
      setSessionType("work");
      toast.info("Ready to work?");
    } else {
      await savePomodoroSession("longBreak", longBreak);
      setSessionType("work");
      toast.info("Let's get back to work!");
    }
    setKey((prev) => prev + 1);
  };

  const handleSessionChange = (type) => {
    setSessionType(type);
    setKey((prev) => prev + 1);
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen gap-8 px-4 py-8">
      {showStats && weeklyStats && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "36rem" }}>
            <h3
              className="text-xl font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Weekly Report
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                {
                  label: "Total Sessions",
                  value: weeklyStats.totalSessions,
                  color: "var(--primary)",
                },
                {
                  label: "Total Time",
                  value: Math.round(weeklyStats.totalMinutes) + " min",
                  color: "var(--success)",
                },
                {
                  label: "Work Sessions",
                  value: weeklyStats.workSessions,
                  color: "var(--warning)",
                },
                {
                  label: "Break Sessions",
                  value: weeklyStats.breakSessions,
                  color: "var(--info)",
                },
              ].map((s, i) => (
                <div key={i} className="card p-4">
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {s.label}
                  </p>
                  <p
                    className="text-2xl font-bold mt-1"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
            <button
              className="btn-primary w-full"
              onClick={() => setShowStats(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl">
        <div className="flex gap-3 mb-8 justify-center flex-wrap">
          {[
            { id: "work", label: "Work" },
            { id: "shortBreak", label: "Short Break" },
            { id: "longBreak", label: "Long Break" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleSessionChange(tab.id)}
              className="px-5 py-2 rounded-lg font-semibold text-sm transition"
              style={{
                backgroundColor:
                  sessionType === tab.id ? "var(--primary)" : "var(--bg-hover)",
                color:
                  sessionType === tab.id
                    ? "var(--text-on-primary)"
                    : "var(--text-secondary)",
                border:
                  "1px solid " +
                  (sessionType === tab.id
                    ? "var(--primary)"
                    : "var(--border-color)"),
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="card p-8 mb-8 text-center">
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

        <div className="flex gap-3 justify-center flex-wrap mb-8">
          <button
            onClick={() => setIsPlaying(true)}
            disabled={isPlaying}
            className="btn-primary py-3 px-6 disabled:opacity-50"
          >
            <Play size={18} /> Start
          </button>
          <button
            onClick={() => setIsPlaying(false)}
            disabled={!isPlaying}
            className="btn-secondary py-3 px-6 disabled:opacity-50"
          >
            <Pause size={18} /> Pause
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setKey((p) => p + 1);
            }}
            className="btn-danger py-3 px-6"
          >
            <RotateCcw size={18} /> Reset
          </button>
          <button
            onClick={() => setShowStats(true)}
            className="btn-outline py-3 px-6"
          >
            <BarChart3 size={18} /> Stats
          </button>
        </div>

        <div className="text-center">
          <p style={{ color: "var(--text-secondary)" }}>
            Pomodoros Today:{" "}
            <span
              className="font-bold text-2xl"
              style={{ color: "var(--primary)" }}
            >
              {pomodoroCount}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pomodoro;
