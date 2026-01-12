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
      toast.success("Code is copied");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.log("Failed to copy code", error);
    }
  };

  const sanitizedDescription = DOMPurify.sanitize(snippet.description);

  const handleEdit = () => {
    navigate(`/snippet/edit/${snippet._id}`, { state: { snippet } });
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const { data } = await axiosInstance.delete(`/snippet/${snippet._id}`);

      if (data.success) {
        toast.success("Snippet deleted successfully!");
        if (onDelete) {
          onDelete(snippet._id);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete snippet");
    } finally {
      setPopup(false);
      setDeleting(false);
    }
  };

  const handlePopupConfirm = () => {
    handleDelete();
  };

  const handlePopupCancel = () => {
    setPopup(false);
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg w-full max-w-full sm:max-w-xl md:max-w-3xl mx-auto flex flex-col gap-6 shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-lg sm:text-xl font-bold break-words">
            {snippet.title}
          </h1>
          <div
            className="desc"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />
        </div>

        <button
          className="bg-gray-100 border border-gray-200 p-2 rounded-lg flex items-center justify-center self-start sm:self-auto"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {isCopied ? (
            <div className="flex gap-2 items-center text-sm">
              <TickIcon className="h-4 w-4" />
              <span>Copied</span>
            </div>
          ) : (
            <CopyIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <span
          className={`${getLanguageColor(
            snippet.language
          )} px-3 py-1 rounded whitespace-nowrap`}
        >
          {snippet.language}
        </span>
        <span
          className={`${getDifficultyColor(
            snippet.difficulty
          )} px-3 py-1 rounded whitespace-nowrap`}
        >
          {snippet.difficulty}
        </span>
      </div>

      <div className="relative w-full overflow-x-auto">
        <CodeContainer language={snippet.language} code={snippet.code} />
      </div>

      <div className="flex flex-wrap gap-2">
        {snippet.tags.map((tag, index) => (
          <div
            key={index}
            className="flex gap-1 items-center text-xs sm:text-sm bg-pink-200 rounded-sm border border-pink-300 shadow hover:bg-pink-300 transition-all duration-200 cursor-pointer whitespace-nowrap px-4 py-2"
          >
            <TagIcon className="h-4 w-4" />
            {tag}
          </div>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <button
          className="flex items-center gap-2 bg-green-400 self-start px-4 py-2 rounded-sm hover:bg-green-600 transition-all duration-200 text-sm sm:text-base"
          onClick={handleEdit}
          aria-label="Edit snippet"
        >
          <PenLineIcon className="h-5 w-5" />
          EDIT
        </button>

        <button
          className="flex items-center gap-2 bg-red-500 self-start px-4 py-2 rounded-sm hover:bg-red-600 transition-all duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setPopup(true)}
          disabled={deleting}
          aria-label="Delete snippet"
        >
          <DeleteIcon className="h-5 w-5" />
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {popup && (
        <div className="fixed inset-0 flex items-start justify-center z-50 pointer-events-none">
          <div
            className="mt-24 bg-white border border-gray-200 shadow-2xl rounded-xl p-6 w-full max-w-md transform transition-all duration-300 scale-100 opacity-100 pointer-events-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-popup-title"
          >
            <h1
              id="delete-popup-title"
              className="text-lg font-semibold text-slate-900 mb-4"
            >
              Are you sure you want to delete this Snippet?
            </h1>
            <div className="flex justify-end gap-4">
              <button
                onClick={handlePopupCancel}
                className="bg-gray-100 hover:bg-gray-200 text-slate-700 px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                aria-label="Cancel deletion"
              >
                No
              </button>
              <button
                onClick={handlePopupConfirm}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200 disabled:opacity-50"
                disabled={deleting}
                aria-label="Confirm deletion"
              >
                {deleting ? "Deleting..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnippetCard;
