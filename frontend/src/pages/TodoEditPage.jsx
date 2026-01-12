import { useEffect, useRef, useState, useContext } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import PlusIcon from "../assets/icons/PlusIcon";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";
import axiosInstance from "../utility/axios";

const TodoEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const todoFromState = location.state?.todo;

  const [loading, setLoading] = useState(!todoFromState);
  const [title, setTitle] = useState(todoFromState?.title || "");
  const [date, setDate] = useState(todoFromState?.dueDate?.slice(0, 10) || "");
  const [description, setDescription] = useState(
    todoFromState?.description || ""
  );

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Enter description...",
      });

      quill.clipboard.dangerouslyPasteHTML(description);

      quill.on("text-change", () => {
        setDescription(quill.root.innerHTML);
      });

      quillRef.current = quill;
    } else if (quillRef.current) {
      quillRef.current.root.innerHTML = description;
    }
  }, [description]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/todos/${id}`);

        if (data.success) {
          const todo = data.data;
          setTitle(todo.title || "");
          setDate(todo.dueDate?.slice(0, 10) || "");
          setDescription(todo.description || "");
        } else {
          toast.error("Failed to fetch todo");
          navigate("/todo-list");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching todo");
        navigate("/todo-list");
      } finally {
        setLoading(false);
      }
    };

    if (!todoFromState) {
      fetchData();
    }
  }, [id, todoFromState, navigate]);

  const handleEditTodo = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!date) {
      toast.error("Due date is required");
      return;
    }

    if (!description || description === "<p><br></p>") {
      toast.error("Description is required");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.put(`/todos/${id}`, {
        title: title.trim(),
        description,
        dueDate: date,
      });

      if (data.success) {
        toast.success("To-Do updated successfully!");
        navigate("/todo-list");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update To-Do. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <section className="max-w-4xl mx-auto p-6 sm:p-10 ml-0 md:ml-64">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-8">Update To-Do</h1>
        <button
          className="flex bg-blue-300 px-3 py-2 rounded-md hover:bg-blue-400"
          onClick={() => navigate("/todo-list")}
        >
          <ArrowBigLeft />
          Back
        </button>
      </div>

      <form
        onSubmit={handleEditTodo}
        className="flex flex-col gap-8 bg-white p-8 rounded-md shadow-lg"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="font-semibold text-gray-700">
            Title <span className="text-red-600 ml-1">*</span>
          </label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">
            Description <span className="text-red-600 ml-1">*</span>
          </label>
          <div
            ref={editorRef}
            className="bg-white border border-gray-300 rounded-md p-3 min-h-[180px] shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="font-semibold text-gray-700">
            Due Date <span className="text-red-600 ml-1">*</span>
          </label>
          <input
            type="date"
            id="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold transition flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusIcon /> {loading ? "Updating..." : "Update Todo"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/todo-list")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default TodoEditPage;
