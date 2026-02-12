import { useContext, useState } from "react";
import CopyIcon from "../../assets/icons/CopyIcon";
import TickIcon from "../../assets/icons/TickIcon";
import getDifficultyColor from "../../utility/getDifficultyColor";
import getLanguageColor from "../../utility/getLanguageColor";
import { toast } from "react-toastify";
import CodeContainer from "./CodeContainer";
import { DeleteIcon, PenLineIcon, TagIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import axiosInstance from "../../utility/axios";

const SnippetCard = ({ snippet, onDelete }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [popup, setPopup] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setIsCopied(true);
      toast.success("Code copied");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.log("Failed to copy code", error);
    }
  };

  const sanitizedDescription = DOMPurify.sanitize(snippet.description);

  const handleEdit = () => {
    navigate("/snippet/edit/" + snippet._id, { state: { snippet } });
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const { data } = await axiosInstance.delete("/snippet/" + snippet._id);
      if (data.success) {
        toast.success("Snippet deleted");
        if (onDelete) onDelete(snippet._id);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete snippet");
    } finally {
      setPopup(false);
      setDeleting(false);
    }
  };

  return (
    <div className="card p-5 w-full flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
            {snippet.title}
          </h3>
          <div className="desc mt-1" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </div>
        <button className="btn-secondary self-start" onClick={handleCopy}>
          {isCopied ? (
            <span className="flex gap-1 items-center text-sm"><TickIcon className="h-4 w-4" /> Copied</span>
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        <span className={getLanguageColor(snippet.language) + " px-3 py-1 rounded"}>{snippet.language}</span>
        <span className={getDifficultyColor(snippet.difficulty) + " px-3 py-1 rounded"}>{snippet.difficulty}</span>
      </div>

      <div className="w-full overflow-x-auto rounded-lg" style={{ border: "1px solid var(--border-color)" }}>
        <CodeContainer language={snippet.language} code={snippet.code} />
      </div>

      <div className="flex flex-wrap gap-2">
        {snippet.tags.map((tag, index) => (
          <span key={index} className="badge badge-pink text-xs">
            <TagIcon className="h-3 w-3" /> {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="btn-primary text-sm py-2" onClick={handleEdit}>
          <PenLineIcon className="h-4 w-4" /> Edit
        </button>
        <button className="btn-danger text-sm py-2" onClick={() => setPopup(true)} disabled={deleting}>
          <DeleteIcon className="h-4 w-4" /> {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {popup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
              Delete this snippet?
            </h3>
            <div className="flex justify-end gap-3">
              <button className="btn-secondary" onClick={() => setPopup(false)}>Cancel</button>
              <button className="btn-danger" onClick={handleDelete} disabled={deleting}>
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnippetCard;
