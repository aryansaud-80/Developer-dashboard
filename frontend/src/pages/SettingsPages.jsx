import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { ArrowLeft, Save } from "lucide-react";
import axiosInstance from "../utility/axios";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    githubUsername: user?.githubUsername || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const oldGithubUsername = user?.githubUsername;
      const { data } = await axiosInstance.put("/users/update", formData);

      if (data.success) {
        setUser(data.data);
        toast.success("Settings updated successfully!");

        // If GitHub username was changed, trigger immediate sync
        if (
          formData.githubUsername &&
          formData.githubUsername !== oldGithubUsername
        ) {
          toast.info("Syncing GitHub data... This may take a few seconds.");

          try {
            await axiosInstance.post("/github/save");
            toast.success("GitHub data synced successfully!");
          } catch (githubError) {
            console.error("GitHub sync error:", githubError);
            toast.error(
              githubError.response?.data?.message ||
                "Failed to sync GitHub data. Please check your username."
            );
          }
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-8 text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Username (Optional)
              </label>
              <input
                type="text"
                name="githubUsername"
                value={formData.githubUsername}
                onChange={handleChange}
                placeholder="Enter your GitHub username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-2">
                Link your GitHub account to track your activity on the dashboard
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              <Save size={20} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
