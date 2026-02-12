import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import axiosInstance from "../utility/axios";

const TodoEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const todoFromState = location.state?.todo;

  const [loading, setLoading] = useState(!todoFromState);
  const [title, setTitle] = useState(todoFromState?.title || "");
  const [date, setDate] = useState(todoFromState?.dueDate?.slice(0, 10) || "");
  const [description, setDescription] = useState(todoFromState?.description || "");

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      const quill = new Quill(editorRef.current, { theme: "snow", placeholder: "Enter description..." });
      quill.clipboard.dangerouslyPasteHTML(description);
      quill.on("text-change", () => setDescription(quill.root.innerHTML));
      quillRef.current = quill;
    } else if (quillRef.current) {
      quillRef.current.root.innerHTML = description;
    }
  }, [description]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/todos/" + id);
        if (data.success) {
          setTitle(data.data.title || "");
          setDate(data.data.dueDate?.slice(0, 10) || "");
          setDescription(data.data.description || "");
        } else { toast.error("Failed to fetch todo"); navigate("/todo-list"); }
      } catch (error) { toast.error("Something went wrong"); navigate("/todo-list"); }
      finally { setLoading(false); }
    };
    if (!todoFromState) fetchData();
  }, [id, todoFromState, navigate]);

  const handleEditTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) { toast.error("Title is required"); return; }
    if (!date) { toast.error("Due date is required"); return; }
    if (!description || description === "<p><br></p>") { toast.error("Description is required"); return; }
    try {
      setLoading(true);
      const { data } = await axiosInstance.put("/todos/" + id, { title: title.trim(), description, dueDate: date });
      if (data.success) { toast.success("Updated"); navigate("/todo-list"); }
    } catch (error) { toast.error(error.response?.data?.message || "Failed to update"); }
    finally { setLoading(false); }
  };

  if (loading) return <div className="page-container text-center" style={{ color: "var(--text-muted)" }}>Loading...</div>;

  return (
    <section className="page-container">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Edit Todo</h1>
          <button className="btn-secondary" onClick={() => navigate("/todo-list")}>
            <ArrowLeft size={16} /> Back
          </button>
        </div>
        <form onSubmit={handleEditTodo} className="card p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="form-label">Title <span style={{ color: "var(--danger)" }}>*</span></label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter todo title" className="input-field" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="form-label">Description <span style={{ color: "var(--danger)" }}>*</span></label>
            <div ref={editorRef} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="form-label">Due Date <span style={{ color: "var(--danger)" }}>*</span></label>
            <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="input-field" />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="btn-primary py-2.5">
              <Save size={16} /> {loading ? "Updating..." : "Update Todo"}
            </button>
            <button type="button" onClick={() => navigate("/todo-list")} className="btn-secondary py-2.5">Cancel</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TodoEditPage;
