import {
  GitBranchIcon,
  SquareArrowOutUpRight,
  StarIcon,
  Timer,
} from "lucide-react";

import formatDate from "../../utility/formatDate";

const GithubRepoCard = ({ repo }) => {
  return (
    <div className="w-full border border-gray-200 px-3 py-6 rounded-lg hover:shadow-lg shadow">
      <div className="flex gap-3 flex-col">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg">{repo?.name}</h1>
          <a href={repo?.html_url} target="_blank" rel="noopener noreferrer">
            <SquareArrowOutUpRight className="w-4 h-4 text-gray-500 hover:text-gray-700" />
          </a>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2">
          {repo?.description || "No description"}
        </p>

        <div className="text-gray-500 flex gap-5">
          <div className="flex gap-2 items-center">
            <StarIcon className="w-4 h-4" />
            <span>{repo?.stargazers_count || 0}</span>
          </div>

          <div className="flex gap-2 items-center">
            <GitBranchIcon className="w-4 h-4" />
            <span>{repo?.forks_count || 0}</span>
          </div>
        </div>

        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-2 pt-2">
          <div className="flex bg-pink-200 border border-pink-300 px-3 py-1 rounded text-sm">
            {repo?.language || "Unknown"}
          </div>

          <div className="text-gray-500 flex gap-2 items-center text-sm">
            <Timer className="h-4 w-4" />
            {formatDate(repo?.created_at)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubRepoCard;
