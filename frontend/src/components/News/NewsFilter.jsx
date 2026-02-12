import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import newsCategory from "../../assets/assets/newsCategory";

const NewsFilter = () => {
  const [selected, setSelected] = useState(newsCategory[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-4 flex-col sm:flex-row items-center w-full">
      <div
        className="flex gap-2 items-center px-3 py-2 rounded-lg w-full"
        style={{
          backgroundColor: "var(--bg-input)",
          border: "1px solid var(--border-color)",
        }}
      >
        <Search size={16} style={{ color: "var(--text-muted)" }} />
        <input
          type="text"
          name="search"
          placeholder="Search tech news..."
          className="w-full outline-none text-sm bg-transparent"
          style={{ color: "var(--text-primary)" }}
        />
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm min-w-[160px]"
          style={{
            backgroundColor: "var(--bg-input)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
          }}
        >
          {selected.icon}
          {selected.name}
          <ChevronDown size={16} className="ml-auto" />
        </button>

        {isOpen && (
          <ul
            className="absolute mt-2 z-10 w-full rounded-lg overflow-hidden"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            {newsCategory.map((cat) => (
              <li
                key={cat.id}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer text-sm"
                style={{ color: "var(--text-primary)" }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--bg-hover)"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                onClick={() => { setSelected(cat); setIsOpen(false); }}
              >
                {cat.icon}
                {cat.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NewsFilter;
