import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import { ArrowLeft, Trash2, Plus, Edit } from "lucide-react";
import axiosInstance from "../utility/axios";

const TodoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useContext(AppContext);
  const [todo, setTodo] = useState(null);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/todos/" + id);
        if (data.success) setTodo(data.data);
        else throw new Error("Failed to load");
      } catch (error) {
        toast.error("Failed to load To-Do");
        navigate("/todo-list");
      } finally {
        setLoading(false);
      }
    };
    if (accessToken) fetchTodo();
    else navigate("/login");
  }, [id, accessToken, navigate]);

  const handleStatusToggle = async () => {
    try {
      const { data } = await axiosInstance.patch("/todos/" + id + "/status", { completed: !todo.completed });
      if (data.success) {
        setTodo(data.data);
        toast.success("Status updated");
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axiosInstance.delete("/todos/" + id);
      if (data.success) { toast.success("Deleted"); navigate("/todo-list"); }
    } catch (error) {
      toast.error("Failed to delete");
    } finally {
      setPopup(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: "var(--primary)" }} />
      </div>
    );
  }

  if (!todo) return null;

  return (
    <section className="page-container">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <button className="btn-secondary" onClick={() => navigate("/todo-list")}>
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex gap-2">
            <button className="btn-primary" onClick={() => navigate("/todos/edit/" + id, { state: { todo } })}>
              <Edit size={16} /> Edit
            </button>
            <button className="btn-danger" onClick={() => setPopup(true)}>
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>

        <div className="card p-6 sm:p-8 flex flex-col gap-6">
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>{todo.title}</h1>

          <div className="desc" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(todo.description) }} />

          <div className="flex flex-wrap items-center gap-4 pt-4" style={{ borderTop: "1px solid var(--border-color)" }}>
            <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Due: {new Date(todo.dueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </div>
            <button
              onClick={handleStatusToggle}
              className="badge text-sm cursor-pointer"
              style={{
                backgroundColor: todo.completed ? "var(--success-light)" : "var(--warning-light)",
                color: todo.completed ? "var(--success)" : "var(--warning)",
              }}
            >
              {todo.completed ? "Completed" : "Pending"}
            </button>
          </div>

          {todo.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {todo.tags.map((tag, i) => (
                <span key={i} className="badge badge-pink text-xs">{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button className="btn-primary" onClick={() => navigate("/add-todo")}>
            <Plus size={16} /> New Todo
          </button>
        </div>

        {popup && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                Delete this todo?
              </h3>
              <div className="flex justify-end gap-3">
                <button className="btn-secondary" onClick={() => setPopup(false)}>Cancel</button>
                <button className="btn-danger" onClick={handleDelete}>Yes, Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TodoPage;
