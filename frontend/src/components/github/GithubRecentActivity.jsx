import getActivityDescription from "../../utility/getActivityEvent";
import formatDate from "../../utility/formatDate";

const GithubRecentActivity = ({ activities }) => {
  return (
    <div className="card p-6 flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
          Recent Activity
        </h2>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Latest public activity
        </span>
      </div>

      {activities && activities.length > 0 ? (
        <div className="flex flex-col gap-3 max-h-96 overflow-auto">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 rounded-lg flex flex-col gap-1"
              style={{
                backgroundColor: "var(--bg-hover)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div className="flex gap-2 items-center">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: "var(--primary)" }}
                />
                <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {getActivityDescription(activity)}
                </h3>
              </div>
              <span className="text-sm pl-4" style={{ color: "var(--text-secondary)" }}>
                {activity.repo.name}
              </span>
              <span className="text-sm pl-4" style={{ color: "var(--text-muted)" }}>
                {formatDate(activity.created_at)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <span style={{ color: "var(--text-muted)" }}>No recent activity available</span>
      )}
    </div>
  );
};
export default GithubRecentActivity;
