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
    username: user?.username || "", email: user?.email || "", githubUsername: user?.githubUsername || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const oldGithubUsername = user?.githubUsername;
      const { data } = await axiosInstance.put("/users/update", formData);
      if (data.success) {
        setUser(data.data);
        toast.success("Settings updated");
        if (formData.githubUsername && formData.githubUsername !== oldGithubUsername) {
          toast.info("Syncing GitHub data...");
          try {
            await axiosInstance.post("/github/save");
            toast.success("GitHub data synced");
          } catch (githubError) {
            toast.error(githubError.response?.data?.message || "Failed to sync GitHub data");
          }
        }
      }
    } catch (error) { toast.error(error.response?.data?.message || "Failed to update settings"); }
    finally { setLoading(false); }
  };

  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate("/")} className="btn-secondary mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <div className="card p-6 sm:p-8">
          <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Settings</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="form-label">Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} className="input-field" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="form-label">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="form-label">GitHub Username (Optional)</label>
              <input type="text" name="githubUsername" value={formData.githubUsername} onChange={handleChange}
                placeholder="Enter your GitHub username" className="input-field" />
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                Link your GitHub account to track your activity
              </p>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-2">
              <Save size={16} /> {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
