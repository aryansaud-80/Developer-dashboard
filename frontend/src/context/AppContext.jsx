import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance, { setUnauthenticatedHandler } from "../utility/axios";

const AppContext = createContext();

const AppContextProvider = (props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(() => {
    const savedCount = localStorage.getItem("pomodoroCount");
    const savedDate = localStorage.getItem("pomodoroDate");
    const today = new Date().toDateString();

    if (savedDate !== today) {
      localStorage.setItem("pomodoroDate", today);
      localStorage.setItem("pomodoroCount", "0");
      return 0;
    }

    return Number(savedCount) || 0;
  });

  const [snippets, setSnippets] = useState([]);
  const [filterSnippet, setFilterSnippet] = useState([]);
  const [workTime, setWorkTime] = useState(
    () => Number(localStorage.getItem("workTime")) || 25
  );
  const [shortBreak, setShortBreak] = useState(
    () => Number(localStorage.getItem("shortBreak")) || 5
  );
  const [longBreak, setLongBreak] = useState(
    () => Number(localStorage.getItem("longBreak")) || 30
  );

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState([]);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pomodoroHistory, setPomodoroHistory] = useState([]);

  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("AI");
  const [refreshTokenInterval, setRefreshTokenInterval] = useState(null);

  // persist token to localStorage
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem("accessToken");
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  }, [accessToken]);

  // register global unauthenticated handler
  useEffect(() => {
    setUnauthenticatedHandler(() => {
      setUser(null);
      setAccessToken(null);
      setIsLoading(false);
      navigate("/login", { replace: true });
    });
  }, [navigate]);

  // load user
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (accessToken) {
          const { data } = await axiosInstance.get("/users/auth/me");
          if (data.success) setUser(data.data);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
        setAccessToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [accessToken]);

  // Auto-refresh token before expiry
  useEffect(() => {
    if (accessToken) {
      // Clear any existing interval
      if (refreshTokenInterval) {
        clearInterval(refreshTokenInterval);
      }

      // Refresh token every 12 minutes (before 15 minute expiry)
      const interval = setInterval(async () => {
        try {
          console.log("[Token Refresh] Proactive refresh...");
          const { data } = await axiosInstance.post("/users/auth/refresh");
          if (data?.data?.accessToken) {
            console.log("[Token Refresh] Success");
            setAccessToken(data.data.accessToken);
          }
        } catch (error) {
          console.error("[Token Refresh] Failed:", error.message);
          // Token refresh failed, user will be logged out on next request
        }
      }, 12 * 60 * 1000); // 12 minutes in milliseconds

      setRefreshTokenInterval(interval);

      return () => clearInterval(interval);
    }
  }, [accessToken]);

  // Persist pomodoro count with daily reset check
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem("pomodoroCount", pomodoroCount.toString());
    localStorage.setItem("pomodoroDate", today);
  }, [pomodoroCount]);

  useEffect(() => localStorage.setItem("workTime", workTime), [workTime]);
  useEffect(() => localStorage.setItem("shortBreak", shortBreak), [shortBreak]);
  useEffect(() => localStorage.setItem("longBreak", longBreak), [longBreak]);

  const value = {
    BACKEND_URL,
    todos,
    setTodos,
    todo,
    setTodo,
    accessToken,
    setAccessToken,
    user,
    setUser,
    isLoading,
    isSettingOpen,
    setIsSettingOpen,
    pomodoroCount,
    setPomodoroCount,
    workTime,
    setWorkTime,
    shortBreak,
    setShortBreak,
    longBreak,
    setLongBreak,
    filterSnippet,
    setFilterSnippet,
    snippets,
    setSnippets,
    news,
    setNews,
    searchQuery,
    setSearchQuery,
    pomodoroHistory,
    setPomodoroHistory,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
