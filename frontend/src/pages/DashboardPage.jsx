import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  CheckCircle2,
  Clock,
  Code2,
  Github,
  Newspaper,
  Settings,
  LogOut,
} from "lucide-react";
import axiosInstance from "../utility/axios";

const DashboardPage = () => {
  const navigate = useNavigate();
  const {
    accessToken,
    user,
    isLoading,
    BACKEND_URL,
    setAccessToken,
    setTodos,
    setPomodoroHistory,
  } = useContext(AppContext);
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !accessToken) {
      navigate("/login");
    }
  }, [accessToken, isLoading, navigate]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Load todos
        const todosRes = await axiosInstance.get("/todos");
        if (todosRes.data.success) {
          setTodos(todosRes.data.data);
        }

        // Load pomodoro stats
        const pomodoroRes = await axiosInstance.get("/pomodoro/history");
        if (pomodoroRes.data.success) {
          setPomodoroHistory(pomodoroRes.data.data.sessions);
          setStats({
            totalTodos: todosRes.data.data.length,
            completedTodos: todosRes.data.data.filter((t) => t.completed)
              .length,
            pendingTodos: todosRes.data.data.filter((t) => !t.completed).length,
            pomodoroSessions: pomodoroRes.data.data.totalSessions,
            completedPomodoros: pomodoroRes.data.data.completedSessions,
            totalWorkTime: pomodoroRes.data.data.totalWorkTime,
          });
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setStatsLoading(false);
      }
    };

    if (accessToken && !isLoading) {
      loadDashboardData();
    }
  }, [accessToken, isLoading, BACKEND_URL, setTodos, setPomodoroHistory]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/users/auth/logout");
      setAccessToken(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!accessToken) {
    return null;
  }

  const features = [
    {
      icon: CheckCircle2,
      title: "Todo Manager",
      description: "Create and manage your daily tasks",
      path: "/todo-list",
      color: "bg-blue-100 text-blue-600",
      action: "View Tasks",
    },
    {
      icon: Clock,
      title: "Pomodoro Timer",
      description: "Boost productivity with timed sessions",
      path: "/pomodoro-timer",
      color: "bg-red-100 text-red-600",
      action: "Start Timer",
    },
    {
      icon: Code2,
      title: "Code Snippets",
      description: "Save and organize your code",
      path: "/code-snippets",
      color: "bg-green-100 text-green-600",
      action: "View Snippets",
    },
    {
      icon: Github,
      title: "GitHub Activity",
      description: "Track your GitHub productivity",
      path: "/github-activity",
      color: "bg-purple-100 text-purple-600",
      action: "View Activity",
    },
    {
      icon: Newspaper,
      title: "Tech News",
      description: "Stay updated with latest tech news",
      path: "/news",
      color: "bg-yellow-100 text-yellow-600",
      action: "Read News",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, <span className="text-indigo-600">{user?.username}</span>
              !
            </h1>
            <p className="text-gray-600 mt-1">{user?.email}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/settings")}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              title="Settings"
            >
              <Settings size={24} className="text-gray-600" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        {!statsLoading && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Total Todos
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stats.totalTodos}
                  </p>
                </div>
                <CheckCircle2 className="text-blue-600" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Completed</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">
                    {stats.completedTodos}
                  </p>
                </div>
                <CheckCircle2 className="text-green-600" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Pending</p>
                  <p className="text-2xl font-bold text-orange-600 mt-2">
                    {stats.pendingTodos}
                  </p>
                </div>
                <CheckCircle2 className="text-orange-600" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Pomodoros</p>
                  <p className="text-2xl font-bold text-red-600 mt-2">
                    {stats.pomodoroSessions}
                  </p>
                </div>
                <Clock className="text-red-600" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Work Time (min)
                  </p>
                  <p className="text-2xl font-bold text-purple-600 mt-2">
                    {stats.totalWorkTime}
                  </p>
                </div>
                <Clock className="text-purple-600" size={32} />
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            What would you like to do?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(feature.path)}
                  className="group bg-white rounded-lg shadow hover:shadow-lg transition p-6 text-left transform hover:scale-105 duration-200"
                >
                  <div className={`${feature.color} rounded-lg p-3 w-fit mb-4`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {feature.description}
                  </p>
                  <div className="text-indigo-600 text-sm font-medium group-hover:text-indigo-700">
                    {feature.action} →
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">💡 Pro Tips</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <li className="flex gap-3">
              <span className="text-indigo-600 font-bold">1.</span>
              <span className="text-gray-700">
                Use Pomodoro Technique for focused work sessions
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-600 font-bold">2.</span>
              <span className="text-gray-700">
                Save code snippets for quick future reference
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-600 font-bold">3.</span>
              <span className="text-gray-700">
                Link GitHub to track your productivity streaks
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
