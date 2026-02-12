import { GitBranchIcon, SquareArrowOutUpRight, StarIcon, Timer } from "lucide-react";
import formatDate from "../../utility/formatDate";

const GithubRepoCard = ({ repo }) => {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
          {repo?.name}
        </h3>
        <a href={repo?.html_url} target="_blank" rel="noopener noreferrer">
          <SquareArrowOutUpRight className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
        </a>
      </div>
      <p className="text-sm line-clamp-2" style={{ color: "var(--text-secondary)" }}>
        {repo?.description || "No description"}
      </p>
      <div className="flex gap-4" style={{ color: "var(--text-muted)" }}>
        <div className="flex gap-1 items-center text-sm">
          <StarIcon className="w-4 h-4" />
          <span>{repo?.stargazers_count || 0}</span>
        </div>
        <div className="flex gap-1 items-center text-sm">
          <GitBranchIcon className="w-4 h-4" />
          <span>{repo?.forks_count || 0}</span>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
        <span className="badge badge-pink">{repo?.language || "Unknown"}</span>
        <div className="flex items-center gap-1 text-sm" style={{ color: "var(--text-muted)" }}>
          <Timer className="h-4 w-4" />
          {formatDate(repo?.created_at)}
        </div>
      </div>
    </div>
  );
};

export default GithubRepoCard;
