import { FunnelIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import filters from "../../assets/assets/Filter";

const SnippetSearchFilter = ({ snippet }) => {
  const [searchFilter, setSearchFilter] = useState("All");
  const { setFilterSnippet, filterSnippet } = useContext(AppContext);

  useEffect(() => {
    const searched = snippet.filter((s) => {
      if (searchFilter === "All") return true;
      return s.language.toLowerCase() === searchFilter.toLowerCase();
    });
    setFilterSnippet(searched);
  }, [searchFilter]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between flex-wrap gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
          <FunnelIcon className="h-4 w-4" />
          <span>Language:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <button
              key={index}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all"
              style={{
                backgroundColor: searchFilter.trim() === filter.trim() ? "var(--primary)" : "var(--bg-hover)",
                color: searchFilter.trim() === filter.trim() ? "var(--text-on-primary)" : "var(--text-secondary)",
                border: "1px solid " + (searchFilter.trim() === filter.trim() ? "var(--primary)" : "var(--border-color)"),
              }}
              onClick={() => setSearchFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <span className="badge badge-pink text-xs">{filterSnippet.length} found</span>
    </div>
  );
};
export default SnippetSearchFilter;
