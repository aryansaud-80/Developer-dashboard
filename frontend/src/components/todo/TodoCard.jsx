import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";

const TodoCard = ({ todo }) => {
  const navigate = useNavigate();

  return (
    <div className="card p-5 w-full max-w-md flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
          {todo.title}
        </h3>
        <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          <Calendar size={14} />
          {new Date(todo.dueDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
        <span
          className="badge text-xs w-fit"
          style={{
            backgroundColor: todo.completed ? "var(--success-light)" : "var(--warning-light)",
            color: todo.completed ? "var(--success)" : "var(--warning)",
          }}
        >
          {todo.completed ? "Completed" : "Pending"}
        </span>
      </div>
      <button
        className="btn-primary w-full py-2"
        onClick={() => navigate("/todo-list/" + todo._id)}
      >
        View Details
      </button>
    </div>
  );
};

export default TodoCard;
