import { Link } from "react-router-dom";
import { AlertTriangle, Home, ChevronLeft } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Main Error Container */}
        <div className="text-center">
          {/* Animated Error Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-full p-6">
                <AlertTriangle
                  className="w-16 h-16 text-white"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>

          {/* Error Code */}
          <div className="mb-6">
            <h1 className="text-9xl font-extrabold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2">
              404
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto mb-6"></div>
          </div>

          {/* Error Title */}
          <h2 className="text-4xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>

          {/* Error Description */}
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            We couldn't find the page you're looking for. It might have been
            removed,
            <br />
            renamed, or doesn't exist yet. Let's get you back on track.
          </p>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition">
              <h3 className="text-white font-semibold mb-2">
                What might have happened:
              </h3>
              <ul className="text-gray-400 text-sm space-y-1 text-left">
                <li>• The page might not exist</li>
                <li>• The link might be broken</li>
                <li>• You might not have access</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition">
              <h3 className="text-white font-semibold mb-2">
                What you can try:
              </h3>
              <ul className="text-gray-400 text-sm space-y-1 text-left">
                <li>• Check the URL for typos</li>
                <li>• Go back and try again</li>
                <li>• Navigate from home page</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={-1}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-semibold transition transform hover:scale-105"
            >
              <ChevronLeft size={20} />
              Go Back
            </Link>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg font-semibold transition transform hover:scale-105 shadow-lg"
            >
              <Home size={20} />
              Back to Home
            </Link>
          </div>

          {/* Footer Message */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-500 text-sm">
              Error Code: 404 | Page Not Found
            </p>
            <p className="text-gray-600 text-xs mt-2">
              If you believe this is a mistake, please contact support.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default ErrorPage;
