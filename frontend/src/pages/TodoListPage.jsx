import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TodoCard from "../components/todo/TodoCard";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import PageHeader from "../components/pageHeader/PageHeader";
import { AlignJustify } from "lucide-react";
import Pagination from "../components/pagination/Pagination";
import axiosInstance from "../utility/axios";

const TodoListPage = () => {
  const { todos, setTodos, accessToken } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const todosPerPage = 6;
  const navigate = useNavigate();
  const location = useLocation();

  const totalPages = Math.ceil(todos.length / todosPerPage);
  const startIndex = (page - 1) * todosPerPage;
  const currentTodos = todos.slice(startIndex, startIndex + todosPerPage);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/todos");

      if (data.success) {
        setTodos(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch todos:", error);
      toast.error(error.response?.data?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  // Fetch todos on mount
  useEffect(() => {
    if (accessToken) {
      fetchTodos();
    }
  }, [accessToken]);

  // Refresh when returning from add/edit pages
  useEffect(() => {
    if (location.state?.refresh) {
      fetchTodos();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Refresh on trigger (e.g., after delete)
  useEffect(() => {
    if (refreshTrigger > 0) {
      fetchTodos();
    }
  }, [refreshTrigger]);

  const handleTodoDelete = (todoId) => {
    const updatedTodos = todos.filter((t) => t._id !== todoId);
    setTodos(updatedTodos);
    toast.success("Todo deleted successfully!");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 ml-0 md:ml-64">
      <PageHeader
        Icon={AlignJustify}
        title={"Todo List"}
        description={"Manage your development tasks and track your progress"}
      />

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <h3 className="text-2xl font-semibold text-gray-800">Your Tasks</h3>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigate("/add-todo")}
            className="w-full sm:w-auto bg-slate-600 text-white font-medium py-2 px-6 rounded-md hover:bg-slate-700 transition duration-200"
          >
            Add Todo
          </button>

          <button
            onClick={() => setRefreshTrigger((prev) => prev + 1)}
            className="w-full sm:w-auto bg-indigo-600 text-white font-medium py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-3">
        {loading ? (
          <p className="text-center text-gray-400 col-span-full">
            Loading todos...
          </p>
        ) : currentTodos.length > 0 ? (
          currentTodos.map((todo) => (
            <TodoCard key={todo._id} todo={todo} onDelete={handleTodoDelete} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No todos found. Create your first task!
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </section>
  );
};

export default TodoListPage;
