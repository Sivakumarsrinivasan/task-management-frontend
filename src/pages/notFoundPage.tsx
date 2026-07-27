import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-20 w-20 text-yellow-500 mb-4" />

        <h1 className="text-7xl font-bold text-gray-900 dark:text-white">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Page Not Found
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/dashboard"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
        >
          <Home size={18} />
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;