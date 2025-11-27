import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-3xl w-full text-center space-y-8">
        {/* Heading */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Welcome to MERN Auth
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            A production-ready full-stack authentication system built with
            MongoDB, Express, React, Node.js, and TypeScript
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          {isAuthenticated ? (
            <Link
              to="/users"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
            >
              View Users
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium text-lg"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
