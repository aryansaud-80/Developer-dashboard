import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserPlus } from "lucide-react";
import axiosInstance from "../utility/axios";
import ThemeToggle from "../components/ThemeToggle";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axiosInstance.post("/users/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      if (data.success) {
        toast.success("Account created successfully! Please log in");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
              <UserPlus size={24} />
            </div>
          </div>
          <h2
            className="text-center text-3xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Create Account
          </h2>
          <p
            className="text-center mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Join DevBoard and boost your productivity
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className="input-field"
              />
            </div>
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
                placeholder="At least 6 characters"
                className="input-field"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="input-field"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3"
            >
              {loading ? "Creating account..." : "Create Account"}
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
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold"
                style={{ color: "var(--primary)" }}
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
