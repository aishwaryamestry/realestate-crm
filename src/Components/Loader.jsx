import React from "react";
import { FaHome } from "react-icons/fa"; // House icon for property management

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="relative flex flex-col items-center space-y-6">
        {/* Animated House */}
        <div className="relative flex items-center justify-center">
          <FaHome
            className="text-blue-500 text-6xl animate-bounce"
            style={{ animationDuration: "1.5s" }}
          />
          <div className="absolute bottom-0 w-20 h-3 bg-blue-200 rounded-full animate-pulse"></div>
        </div>

        {/* Rotating Circle */}
        <div className="h-24 w-24 border-t-4 border-blue-500 border-b-4 border-gray-300 dark:border-gray-600 rounded-full animate-spin"></div>

        {/* Loading Text */}
        <p className="text-lg font-medium text-gray-700 dark:text-gray-200 animate-fade">
          Preparing your dashboard...
        </p>
      </div>
    </div>
  );
};

export default Loader;
