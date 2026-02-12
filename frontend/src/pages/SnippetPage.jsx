import { useContext, useState, useEffect } from "react";
import SnippetCard from "../components/snippet/SnippetCard";
import { CodeIcon, Plus } from "lucide-react";
import PageHeader from "../components/pageHeader/PageHeader";
import SnippetSearchFilter from "../components/snippet/SnippetSearchFilter";
import { AppContext } from "../context/AppContext";
import Pagination from "../components/pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utility/axios";

const SnippetPage = () => {
  const { snippets, setSnippets, accessToken, filterSnippet, setFilterSnippet } = useContext(AppContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const maxItem = 4;

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/snippet");
        if (data.success) { setSnippets(data.data); setFilterSnippet(data.data); }
      } catch (error) { toast.error(error.response?.data?.message || "Failed to fetch snippets"); }
      finally { setLoading(false); }
    };
    if (accessToken) fetchSnippets();
  }, [accessToken, setSnippets, setFilterSnippet]);

  useEffect(() => { setPage(1); }, [filterSnippet]);

  const handleSnippetDelete = (snippetId) => {
    const updated = snippets.filter((s) => s._id !== snippetId);
    setSnippets(updated);
    setFilterSnippet(updated);
  };

  const start = maxItem * (page - 1);
  const currentSnippet = filterSnippet.slice(start, start + maxItem);
  const totalPages = Math.ceil(filterSnippet.length / maxItem);

  return (
    <div className="page-container flex flex-col gap-8">
      <PageHeader Icon={CodeIcon} title="Code Snippets" description="Save and organize your code snippets.">
        <button className="btn-primary" onClick={() => navigate("/add-snippet")}>
          <Plus size={16} /> Add Snippet
        </button>
      </PageHeader>

      <SnippetSearchFilter snippet={snippets} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <p className="text-center col-span-full" style={{ color: "var(--text-muted)" }}>Loading snippets...</p>
        ) : currentSnippet.length > 0 ? (
          currentSnippet.map((item) => <SnippetCard key={item._id} snippet={item} onDelete={handleSnippetDelete} />)
        ) : (
          <p className="text-center col-span-full" style={{ color: "var(--text-muted)" }}>No snippets found.</p>
        )}
      </div>

      {totalPages > 1 && <Pagination page={page} setPage={setPage} totalPages={totalPages} />}
    </div>
  );
};

export default SnippetPage;
