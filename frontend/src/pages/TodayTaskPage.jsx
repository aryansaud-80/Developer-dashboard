import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import PageHeader from "../components/pageHeader/PageHeader";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import axiosInstance from "../utility/axios";
import DOMPurify from "dompurify";

const TodayTaskPage = () => {
  const { todos, BACKEND_URL, accessToken } = useContext(AppContext);
  const [todayTodos, setTodayTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodayTodos = async () => {
      try {
        setLoading(true);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const { data } = await axiosInstance.get(`/todos`);

        if (data.success) {
          const filtered = data.data.filter((todo) => {
            const dueDate = new Date(todo.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate.getTime() === today.getTime();
          });
          setTodayTodos(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch today tasks:", error);
        toast.error("Failed to fetch today tasks");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchTodayTodos();
    }
  }, [accessToken, BACKEND_URL]);

  const completedCount = todayTodos.filter((t) => t.completed).length;
  const pendingCount = todayTodos.length - completedCount;

  const handleToggleComplete = async (todoId, currentStatus) => {
    try {
      const { data } = await axiosInstance.patch(`/todos/${todoId}/status`, {
        completed: !currentStatus,
      });

      if (data.success) {
        setTodayTodos((prev) =>
          prev.map((t) =>
            t._id === todoId ? { ...t, completed: !currentStatus } : t
          )
        );
        toast.success("Task updated!");
      }
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 ml-0 md:ml-64">
      <PageHeader
        Icon={Calendar}
        title={"Today's Tasks"}
        description={"Focus on what matters today"}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {todayTodos.length}
              </p>
            </div>
            <Calendar className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {completedCount}
              </p>
            </div>
            <CheckCircle2 className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {pendingCount}
              </p>
            </div>
            <Clock className="text-orange-600" size={32} />
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Your Tasks for Today
          </h2>
        </div>

        <div className="divide-y">
          {loading ? (
            <div className="p-6 text-center text-gray-400">Loading...</div>
          ) : todayTodos.length > 0 ? (
            todayTodos.map((todo) => (
              <div
                key={todo._id}
                className="p-6 hover:bg-gray-50 transition flex items-start gap-4"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    handleToggleComplete(todo._id, todo.completed)
                  }
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-indigo-600 cursor-pointer"
                />
                <div className="flex-grow">
                  <h3
                    className={`text-lg font-semibold ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-900"
                    }`}
                  >
                    {todo.title}
                  </h3>
                  <div
                    className="text-gray-600 text-sm mt-1 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(todo.description),
                    }}
                  />
                  <div className="mt-3 flex gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        todo.completed
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {todo.completed ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/todo-list/${todo._id}`)}
                  className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-400">
              No tasks for today. Great job! 🎉
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TodayTaskPage;
