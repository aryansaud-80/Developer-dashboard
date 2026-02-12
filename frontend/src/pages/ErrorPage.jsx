import { Link } from "react-router-dom";
import { AlertTriangle, Home, ChevronLeft } from "lucide-react";

const ErrorPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="w-full max-w-lg text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full p-5" style={{ backgroundColor: "var(--danger-light)" }}>
            <AlertTriangle className="w-12 h-12" style={{ color: "var(--danger)" }} />
          </div>
        </div>
        <h1 className="text-7xl font-bold mb-4" style={{ color: "var(--primary)" }}>404</h1>
        <div className="h-1 w-16 rounded-full mx-auto mb-6" style={{ backgroundColor: "var(--primary)" }} />
        <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Page Not Found</h2>
        <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to={-1} className="btn-secondary py-2.5 px-6">
            <ChevronLeft size={18} /> Go Back
          </Link>
          <Link to="/" className="btn-primary py-2.5 px-6">
            <Home size={18} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
