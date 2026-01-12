import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import PlusIcon from "../assets/icons/PlusIcon";
import axiosInstance from "../utility/axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
        toast.success("To-Do added successfully!");
        setTitle("");
        setDate("");
        quillRef.current.setText("");

        // Navigate to todo list after 1 second
        setTimeout(() => {
          navigate("/todo-list");
        }, 1000);
      }
    } catch (error) {
      console.error("Failed to add todo:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add To-Do. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6 sm:p-10 ml-0 md:ml-64">
      <h1 className="text-3xl font-bold mb-8">Add New To-Do</h1>

      <form
        onSubmit={handleAddTodo}
        className="flex flex-col gap-8 bg-white p-8 rounded-md shadow-lg"
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="title"
            className="font-semibold text-gray-700 flex items-center"
          >
            Title <span className="text-red-600 ml-1">*</span>
          </label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700 flex items-center">
            Description <span className="text-red-600 ml-1">*</span>
          </label>
          <div
            ref={editorRef}
            className="bg-white border border-gray-300 rounded-md p-3 min-h-[180px] shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="date"
            className="font-semibold text-gray-700 flex items-center"
          >
            Due Date <span className="text-red-600 ml-1">*</span>
          </label>
          <input
            type="date"
            id="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold transition flex gap-3 items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusIcon />
            {loading ? "Adding..." : "Add Todo"}
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

export default AddTodoPage;
