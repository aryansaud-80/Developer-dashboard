import { Calendar, SquareArrowOutUpRight } from "lucide-react";
import formatDate from "../../utility/formatDate";

const ProfileCard = ({ name, username, created_at, avatar_url, html_url }) => {
  return (
    <div className="card p-6 flex flex-col lg:flex-row justify-between items-center gap-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <img
          src={avatar_url}
          alt={name}
          className="w-20 h-20 rounded-full"
          style={{ border: "3px solid var(--primary)" }}
        />
        <div className="flex flex-col gap-1 text-center md:text-left">
          <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
            <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              {name}
            </h1>
            <span className="badge badge-pink">Your Profile</span>
          </div>
          <span style={{ color: "var(--text-secondary)" }}>{username}</span>
          <div className="flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Joined {formatDate(created_at)}</span>
          </div>
        </div>
      </div>
      <a
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline"
      >
        <SquareArrowOutUpRight className="w-4 h-4" />
        View Profile
      </a>
    </div>
  );
};
export default ProfileCard;
