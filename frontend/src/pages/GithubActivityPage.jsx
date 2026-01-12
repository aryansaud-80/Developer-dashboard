import {
  GitBranchPlusIcon,
  GithubIcon,
  StarIcon,
  UserRoundIcon,
  RefreshCw,
} from "lucide-react";
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
      if (data.success) {
        setGithubActivity(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch GitHub data:", error);
      if (error.response?.status === 400 || error.response?.status === 404) {
        toast.info("Please link your GitHub username in settings first");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to fetch GitHub data"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!user?.githubUsername) {
      toast.error("Please set your GitHub username in settings first");
      return;
    }

    try {
      setRefreshing(true);
      toast.info("Syncing GitHub data...");

      await axiosInstance.post("/github/save");
      
      // Fetch the updated data
      await fetchGithubActivity();
      
      toast.success("GitHub data refreshed successfully!");
    } catch (error) {
      console.error("Failed to refresh GitHub data:", error);
      toast.error(
        error.response?.data?.message || "Failed to refresh GitHub data"
      );
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchGithubActivity();
    }
  }, [accessToken, BACKEND_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 ml-0 md:ml-64">
      <div className="flex justify-between items-start">
        <PageHeader
          Icon={GitBranchPlusIcon}
          title={"GitHub Dashboard"}
          description={`Welcome, ${
            githubActivity.username || "Developer"
          }! Here's your GitHub activity.`}
        />
        {githubActivity.username && (
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            <RefreshCw
              size={20}
              className={refreshing ? "animate-spin" : ""}
            />
            {refreshing ? "Syncing..." : "Refresh"}
          </button>
        )}
      </div>

      {!githubActivity.username ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <p className="text-gray-700 mb-4">
            No GitHub data found. Please link your GitHub username in settings
            to see your activity.
          </p>
          <Link
            to="/settings"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Go to Settings →
          </Link>
        </div>
      ) : (
        <>
          <ProfileCard
            name={githubActivity.name}
            avatar_url={githubActivity.avatar_url}
            html_url={githubActivity.html_url}
            created_at={githubActivity.created_at}
            username={githubActivity.username}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <GithubStatCard
              title="Followers"
              statNumber={githubActivity.followers}
              Icon={UserRoundIcon}
            />
            <GithubStatCard
              title="Following"
              statNumber={githubActivity.following}
              Icon={UserRoundIcon}
            />
            <GithubStatCard
              title="Total Stars"
              statNumber={githubActivity.totalStars}
              Icon={StarIcon}
            />
            <GithubStatCard
              title="Repositories"
              statNumber={githubActivity.repositories?.length}
              Icon={GithubIcon}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-3 grid-cols-1">
            <div className="flex bg-white shadow border border-gray-200 rounded-md flex-col items-center p-3">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Language Distribution</h1>
                <span className="text-sm text-gray-500">
                  Programming languages used across repositories
                </span>
              </div>
              {githubActivity.languages &&
                githubActivity.languages.length > 0 && (
                  <BarChart data={githubActivity.languages} />
                )}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            {githubActivity.recentActivities &&
            githubActivity.recentActivities.length > 0 ? (
              <GithubRecentActivity
                activities={githubActivity.recentActivities}
              />
            ) : (
              <p className="text-gray-500">No recent activities found</p>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Repositories</h2>
            <div className="grid grid-cols-1 gap-6">
              {githubActivity.repositories &&
              githubActivity.repositories.length > 0 ? (
                githubActivity.repositories.map((repo) => (
                  <GithubRepoCard key={repo.id} repo={repo} />
                ))
              ) : (
                <p className="text-gray-500">No repositories found</p>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default GithubActivityPage;