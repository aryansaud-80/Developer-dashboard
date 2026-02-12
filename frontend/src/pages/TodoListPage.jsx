import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TodoCard from "../components/todo/TodoCard";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import PageHeader from "../components/pageHeader/PageHeader";
import { AlignJustify, Plus, RefreshCw } from "lucide-react";
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
      if (data.success) setTodos(data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (accessToken) fetchTodos(); }, [accessToken]);
  useEffect(() => {
    if (location.state?.refresh) { fetchTodos(); window.history.replaceState({}, document.title); }
  }, [location]);
  useEffect(() => { if (refreshTrigger > 0) fetchTodos(); }, [refreshTrigger]);

  const handleTodoDelete = (todoId) => {
    setTodos(todos.filter((t) => t._id !== todoId));
    toast.success("Todo deleted");
  };

  return (
    <section className="page-container flex flex-col gap-8">
      <PageHeader Icon={AlignJustify} title="Todo List" description="Manage your tasks and track progress" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>Your Tasks</h3>
        <div className="flex gap-3">
          <button onClick={() => navigate("/add-todo")} className="btn-primary">
            <Plus size={16} /> Add Todo
          </button>
          <button onClick={() => setRefreshTrigger((p) => p + 1)} className="btn-secondary">
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center col-span-full" style={{ color: "var(--text-muted)" }}>Loading todos...</p>
        ) : currentTodos.length > 0 ? (
          currentTodos.map((todo) => <TodoCard key={todo._id} todo={todo} onDelete={handleTodoDelete} />)
        ) : (
          <p className="text-center col-span-full" style={{ color: "var(--text-muted)" }}>No todos found. Create your first task!</p>
        )}
      </div>

      {totalPages > 1 && <Pagination page={page} setPage={setPage} totalPages={totalPages} />}
    </section>
  );
};

export default TodoListPage;
