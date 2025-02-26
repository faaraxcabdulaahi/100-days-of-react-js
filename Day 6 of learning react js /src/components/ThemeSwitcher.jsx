import React from "react";
import { useTheme } from "../context/ThemeProvider";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray dark:bg-gray-800 text-gray-900 dark:text-white shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        {theme === "dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
