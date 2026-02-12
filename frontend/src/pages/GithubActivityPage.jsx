import { GitBranchPlusIcon, GithubIcon, StarIcon, UserRoundIcon, RefreshCw } from "lucide-react";
import PageHeader from "../components/pageHeader/PageHeader";
import ProfileCard from "../components/github/ProfileCard";
import GithubStatCard from "../components/github/GithubStatCard";
import GithubRepoCard from "../components/github/GithubRepoCard";
import GithubRecentActivity from "../components/github/GithubRecentActivity";
import BarChart from "../components/chart/BarChart";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axiosInstance from "../utility/axios";
import { Link } from "react-router-dom";

const GithubActivityPage = () => {
  const [githubActivity, setGithubActivity] = useState({});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { BACKEND_URL, accessToken, user } = useContext(AppContext);

  const fetchGithubActivity = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/github");
      if (data.success) setGithubActivity(data.data);
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 404) {
        toast.info("Please link your GitHub username in settings first");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch GitHub data");
      }
    } finally { setLoading(false); }
  };

  const handleRefresh = async () => {
    if (!user?.githubUsername) { toast.error("Set your GitHub username in settings first"); return; }
    try {
      setRefreshing(true);
      toast.info("Syncing GitHub data...");
      await axiosInstance.post("/github/save");
      await fetchGithubActivity();
      toast.success("GitHub data refreshed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to refresh");
    } finally { setRefreshing(false); }
  };

  useEffect(() => { if (accessToken) fetchGithubActivity(); }, [accessToken, BACKEND_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: "var(--primary)" }} />
      </div>
    );
  }

  return (
    <section className="page-container flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <PageHeader Icon={GitBranchPlusIcon} title="GitHub Dashboard"
          description={"Welcome, " + (githubActivity.username || "Developer") + "!"} />
        {githubActivity.username && (
          <button onClick={handleRefresh} disabled={refreshing} className="btn-primary shrink-0">
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Syncing..." : "Refresh"}
          </button>
        )}
      </div>

      {!githubActivity.username ? (
        <div className="card p-8 text-center" style={{ backgroundColor: "var(--primary-light)" }}>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            No GitHub data found. Link your username in settings.
          </p>
          <Link to="/settings" className="btn-primary">Go to Settings</Link>
        </div>
      ) : (
        <>
          <ProfileCard name={githubActivity.name} avatar_url={githubActivity.avatar_url}
            html_url={githubActivity.html_url} created_at={githubActivity.created_at} username={githubActivity.username} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <GithubStatCard title="Followers" statNumber={githubActivity.followers} Icon={UserRoundIcon} />
            <GithubStatCard title="Following" statNumber={githubActivity.following} Icon={UserRoundIcon} />
            <GithubStatCard title="Total Stars" statNumber={githubActivity.totalStars} Icon={StarIcon} />
            <GithubStatCard title="Repositories" statNumber={githubActivity.repositories?.length} Icon={GithubIcon} />
          </div>

          {githubActivity.languages && githubActivity.languages.length > 0 && (
            <div className="card p-5">
              <h2 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Language Distribution</h2>
              <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>Programming languages used across repos</p>
              <BarChart data={githubActivity.languages} />
            </div>
          )}

          {githubActivity.recentActivities && githubActivity.recentActivities.length > 0 && (
            <GithubRecentActivity activities={githubActivity.recentActivities} />
          )}

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Repositories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {githubActivity.repositories && githubActivity.repositories.length > 0 ? (
                githubActivity.repositories.map((repo) => <GithubRepoCard key={repo.id} repo={repo} />)
              ) : (
                <p style={{ color: "var(--text-muted)" }}>No repositories found</p>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default GithubActivityPage;
