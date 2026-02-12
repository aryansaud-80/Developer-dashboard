import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import PageHeader from "../components/pageHeader/PageHeader";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import axiosInstance from "../utility/axios";
import DOMPurify from "dompurify";

const TodayTaskPage = () => {
  const { BACKEND_URL, accessToken } = useContext(AppContext);
  const [todayTodos, setTodayTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodayTodos = async () => {
      try {
        setLoading(true);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const { data } = await axiosInstance.get("/todos");
        if (data.success) {
          const filtered = data.data.filter((todo) => {
            const dueDate = new Date(todo.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate.getTime() === today.getTime();
          });
          setTodayTodos(filtered);
        }
      } catch (error) {
        toast.error("Failed to fetch today tasks");
      } finally {
        setLoading(false);
      }
    };
    if (accessToken) fetchTodayTodos();
  }, [accessToken, BACKEND_URL]);

  const completedCount = todayTodos.filter((t) => t.completed).length;
  const pendingCount = todayTodos.length - completedCount;

  const handleToggleComplete = async (todoId, currentStatus) => {
    try {
      const { data } = await axiosInstance.patch(
        "/todos/" + todoId + "/status",
        { completed: !currentStatus },
      );
      if (data.success) {
        setTodayTodos((prev) =>
          prev.map((t) =>
            t._id === todoId ? { ...t, completed: !currentStatus } : t,
          ),
        );
        toast.success("Task updated");
      }
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  return (
    <section className="page-container flex flex-col gap-8">
      <PageHeader
        Icon={Calendar}
        title="Today's Tasks"
        description="Focus on what matters today"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Total Tasks",
            value: todayTodos.length,
            Icon: Calendar,
            color: "var(--primary)",
          },
          {
            label: "Completed",
            value: completedCount,
            Icon: CheckCircle2,
            color: "var(--success)",
          },
          {
            label: "Pending",
            value: pendingCount,
            Icon: Clock,
            color: "var(--warning)",
          },
        ].map((stat, i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {stat.label}
                </p>
                <p
                  className="text-2xl font-bold mt-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
              </div>
              <stat.Icon size={28} style={{ color: stat.color }} />
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div
          className="p-5"
          style={{ borderBottom: "1px solid var(--border-color)" }}
        >
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Your Tasks for Today
          </h2>
        </div>
        <div>
          {loading ? (
            <div
              className="p-6 text-center"
              style={{ color: "var(--text-muted)" }}
            >
              Loading...
            </div>
          ) : todayTodos.length > 0 ? (
            todayTodos.map((todo) => (
              <div
                key={todo._id}
                className="p-5 flex items-start gap-4 transition"
                style={{ borderBottom: "1px solid var(--border-color)" }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    handleToggleComplete(todo._id, todo.completed)
                  }
                  className="mt-1 w-5 h-5 rounded cursor-pointer accent-pink-500"
                />
                <div className="flex-grow">
                  <h3
                    className="font-semibold"
                    style={{
                      color: todo.completed
                        ? "var(--text-muted)"
                        : "var(--text-primary)",
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.title}
                  </h3>
                  <div
                    className="desc text-sm mt-1"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(todo.description),
                    }}
                  />
                  <span
                    className="badge text-xs mt-2"
                    style={{
                      backgroundColor: todo.completed
                        ? "var(--success-light)"
                        : "var(--warning-light)",
                      color: todo.completed
                        ? "var(--success)"
                        : "var(--warning)",
                    }}
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </span>
                </div>
                <button
                  onClick={() => navigate("/todo-list/" + todo._id)}
                  className="text-sm font-medium shrink-0"
                  style={{ color: "var(--primary)" }}
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <div
              className="p-6 text-center"
              style={{ color: "var(--text-muted)" }}
            >
              No tasks for today. Great job!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TodayTaskPage;
