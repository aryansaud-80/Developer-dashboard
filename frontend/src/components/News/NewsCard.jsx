import { Timer } from "lucide-react";
import { format } from "date-fns";

const NewsCard = ({ article }) => {
  const { title, description, image_url, pubDate, category, source_id, link } = article;

  return (
    <div className="card overflow-hidden">
      <div className="relative h-44 w-full overflow-hidden">
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className="object-cover w-full h-full transition-transform hover:scale-105"
            onError={(e) => { e.currentTarget.src = "/placeholder.svg?height=180&width=320"; }}
          />
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: "var(--bg-hover)" }} />
        )}
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs" style={{ color: "var(--text-muted)" }}>
          <span className="badge badge-pink">{category?.[0] || "General"}</span>
          <span>{format(new Date(pubDate), "LLL d, yyyy")}</span>
        </div>
        <h3 className="font-semibold text-base leading-tight line-clamp-2" style={{ color: "var(--text-primary)" }}>
          <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {title}
          </a>
        </h3>
        <p className="text-sm line-clamp-2" style={{ color: "var(--text-secondary)" }}>
          {description || "No description available."}
        </p>
        <div className="flex justify-between items-center mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <span className="badge" style={{ backgroundColor: "var(--bg-hover)", color: "var(--text-secondary)" }}>
            {source_id || "Unknown"}
          </span>
          <div className="flex items-center gap-1">
            <Timer size={12} />
            <span>1 min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
