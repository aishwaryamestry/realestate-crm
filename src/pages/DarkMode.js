import React, { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useTheme } from "../context/ThemeContext"; // Use your custom context

const DarkMode = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 dark:text-white transition-colors ease-in-out duration-300 flex items-center justify-center"
    >
      {isDarkMode ? (
        <SunIcon className="h-6 w-6 text-yellow-500" />
      ) : (
        <MoonIcon className="h-6 w-6 text-blue-500" />
      )}
    </button>
  );
};

export default DarkMode;
