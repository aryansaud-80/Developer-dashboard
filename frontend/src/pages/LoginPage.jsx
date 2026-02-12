import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { LogIn } from "lucide-react";
import axiosInstance from "../utility/axios";
import ThemeToggle from "../components/ThemeToggle";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axiosInstance.post("/users/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      if (data.success) {
        setAccessToken(data.data.accessToken);
        setUser(data.data.user);
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <div className="card p-8" style={{ boxShadow: "var(--shadow-lg)" }}>
          <div className="flex justify-center mb-8">
            <div
              className="flex items-center justify-center h-12 w-12 rounded-md"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--text-on-primary)",
              }}
            >
              <LogIn size={24} />
            </div>
          </div>
          <h2
            className="text-center text-3xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Welcome Back
          </h2>
          <p
            className="text-center mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Log in to your DevBoard account
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="input-field"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                className="input-field"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <div
            className="mt-6 pt-6"
            style={{ borderTop: "1px solid var(--border-color)" }}
          >
            <p
              className="text-center"
              style={{ color: "var(--text-secondary)" }}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold"
                style={{ color: "var(--primary)" }}
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
