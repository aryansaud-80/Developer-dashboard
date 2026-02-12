import { useEffect, useRef, useState, useContext } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import axiosInstance from "../utility/axios";

const AddTodoPage = () => {
  const { accessToken } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your task description...",
      });
    }
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!date) {
      toast.error("Due date is required");
      return;
    }
    const description = quillRef.current?.root.innerHTML;
    if (!description || description === "<p><br></p>") {
      toast.error("Description is required");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/todos", {
        title: title.trim(),
        description,
        dueDate: date,
      });
      if (data.success) {
        toast.success("Todo added");
        setTitle("");
        setDate("");
        quillRef.current.setText("");
        setTimeout(() => navigate("/todo-list"), 500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-container">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Add New Todo
          </h1>
          <button
            className="btn-secondary"
            onClick={() => navigate("/todo-list")}
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>
        <form
          onSubmit={handleAddTodo}
          className="card p-6 sm:p-8 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1">
            <label className="form-label">
              Title <span style={{ color: "var(--danger)" }}>*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter todo title"
              className="input-field"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="form-label">
              Description <span style={{ color: "var(--danger)" }}>*</span>
            </label>
            <div ref={editorRef} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="form-label">
              Due Date <span style={{ color: "var(--danger)" }}>*</span>
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary py-2.5"
            >
              <Plus size={16} /> {loading ? "Adding..." : "Add Todo"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/todo-list")}
              className="btn-secondary py-2.5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTodoPage;
