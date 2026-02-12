import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import ThemeToggle from "../components/ThemeToggle";
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
    if (!isLoading && !accessToken) navigate("/login");
  }, [accessToken, isLoading, navigate]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const todosRes = await axiosInstance.get("/todos");
        if (todosRes.data.success) setTodos(todosRes.data.data);
        const pomodoroRes = await axiosInstance.get("/pomodoro/history");
        if (pomodoroRes.data.success) {
          setPomodoroHistory(pomodoroRes.data.data.sessions);
          setStats({
            totalTodos: todosRes.data.data.length,
            completedTodos: todosRes.data.data.filter((t) => t.completed)
              .length,
            pendingTodos: todosRes.data.data.filter((t) => !t.completed).length,
            pomodoroSessions: pomodoroRes.data.data.totalSessions,
            totalWorkTime: pomodoroRes.data.data.totalWorkTime,
          });
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setStatsLoading(false);
      }
    };
    if (accessToken && !isLoading) loadDashboardData();
  }, [accessToken, isLoading]);

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
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderColor: "var(--primary)" }}
        />
      </div>
    );
  }

  if (!accessToken) return null;

  const features = [
    {
      icon: CheckCircle2,
      title: "Todo Manager",
      desc: "Manage your daily tasks",
      path: "/todo-list",
      action: "View Tasks",
    },
    {
      icon: Clock,
      title: "Pomodoro Timer",
      desc: "Boost productivity",
      path: "/pomodoro-timer",
      action: "Start Timer",
    },
    {
      icon: Code2,
      title: "Code Snippets",
      desc: "Save and organize code",
      path: "/code-snippets",
      action: "View Snippets",
    },
    {
      icon: Github,
      title: "GitHub Activity",
      desc: "Track your GitHub stats",
      path: "/github-activity",
      action: "View Activity",
    },
    {
      icon: Newspaper,
      title: "Tech News",
      desc: "Stay updated with tech",
      path: "/news",
      action: "Read News",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div
        style={{
          backgroundColor: "var(--bg-card)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Welcome,{" "}
              <span style={{ color: "var(--primary)" }}>{user?.username}</span>
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              {user?.email}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <ThemeToggle />
            <button
              onClick={() => navigate("/settings")}
              className="btn-secondary"
              title="Settings"
            >
              <Settings size={18} />
            </button>
            <button onClick={handleLogout} className="btn-danger">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {!statsLoading && stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {[
              {
                label: "Total Todos",
                value: stats.totalTodos,
                color: "var(--primary)",
                Icon: CheckCircle2,
              },
              {
                label: "Completed",
                value: stats.completedTodos,
                color: "var(--success)",
                Icon: CheckCircle2,
              },
              {
                label: "Pending",
                value: stats.pendingTodos,
                color: "var(--warning)",
                Icon: CheckCircle2,
              },
              {
                label: "Pomodoros",
                value: stats.pomodoroSessions,
                color: "var(--danger)",
                Icon: Clock,
              },
              {
                label: "Work Time",
                value: stats.totalWorkTime + "m",
                color: "var(--info)",
                Icon: Clock,
              },
            ].map((stat, i) => (
              <div key={i} className="card p-4">
                <p
                  className="text-xs font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {stat.label}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p
                    className="text-xl font-bold"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <stat.Icon size={20} style={{ color: stat.color }} />
                </div>
              </div>
            ))}
          </div>
        )}

        <h2
          className="text-xl font-bold mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          Quick Access
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <button
                key={i}
                onClick={() => navigate(feature.path)}
                className="card p-5 text-left transition"
              >
                <div
                  className="rounded-lg p-2.5 w-fit mb-3"
                  style={{
                    backgroundColor: "var(--primary-light)",
                    color: "var(--primary)",
                  }}
                >
                  <Icon size={22} />
                </div>
                <h3
                  className="font-semibold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-xs mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {feature.desc}
                </p>
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--primary)" }}
                >
                  {feature.action} →
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="card p-6"
          style={{ backgroundColor: "var(--primary-light)" }}
        >
          <h3
            className="font-bold mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Pro Tips
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Use Pomodoro for focused work sessions",
              "Save code snippets for quick reference",
              "Link GitHub to track productivity",
            ].map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="font-bold" style={{ color: "var(--primary)" }}>
                  {i + 1}.
                </span>
                <span style={{ color: "var(--text-secondary)" }}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
