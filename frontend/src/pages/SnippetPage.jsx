import { useContext, useState, useEffect } from "react";
import SnippetCard from "../components/snippet/SnippetCard";
import { CodeIcon, PlusIcon } from "lucide-react";
import PageHeader from "../components/pageHeader/PageHeader";
import SnippetSearchFilter from "../components/snippet/SnippetSearchFilter";
import { AppContext } from "../context/AppContext";
import Pagination from "../components/pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utility/axios";

const SnippetPage = () => {
  const {
    snippets,
    setSnippets,
    accessToken,
    filterSnippet,
    setFilterSnippet,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const maxItem = 4;

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/snippet");

        if (data.success) {
          setSnippets(data.data);
          setFilterSnippet(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch snippets:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch snippets"
        );
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchSnippets();
    }
  }, [accessToken, setSnippets, setFilterSnippet]);

  useEffect(() => {
    setPage(1);
  }, [filterSnippet]);

  const handleSnippetDelete = (snippetId) => {
    const updatedSnippets = snippets.filter((s) => s._id !== snippetId);
    setSnippets(updatedSnippets);
    setFilterSnippet(updatedSnippets);
  };

  const start = maxItem * (page - 1);
  const end = start + maxItem;
  const currentSnippet = filterSnippet.slice(start, end);

  const totalPages = Math.ceil(filterSnippet.length / maxItem);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 ml-0 md:ml-64">
      <div>
        <PageHeader
          Icon={CodeIcon}
          title={"Code Snippets"}
          description={"Save and organize your frequently used code snippets."}
        >
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-md shadow-md transition"
            onClick={() => navigate("/add-snippet")}
          >
            <PlusIcon size={20} />
            Add Snippet
          </button>
        </PageHeader>
      </div>

      <SnippetSearchFilter snippet={snippets} />

      <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <p className="text-center text-gray-400 col-span-full">
            Loading snippets...
          </p>
        ) : currentSnippet.length > 0 ? (
          currentSnippet.map((item) => (
            <SnippetCard
              key={item._id}
              snippet={item}
              onDelete={handleSnippetDelete}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No snippets found. Create your first snippet!
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default SnippetPage;