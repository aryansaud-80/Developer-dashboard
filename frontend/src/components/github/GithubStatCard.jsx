const GithubStatCard = ({ title, statNumber, Icon }) => {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          {title || "Stat"}
        </span>
        <Icon className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
      </div>
      <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
        {statNumber || 0}
      </p>
    </div>
  );
};
export default GithubStatCard;
