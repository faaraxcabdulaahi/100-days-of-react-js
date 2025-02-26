import React from "react";
import ThemeSwitcher from "../components/ThemeSwitcher";

const Home = () => {
  return <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
    <h1 className="text-3xl font-bold mb-4">Theme Switcher</h1>
    <ThemeSwitcher/>
  </div>;
};

export default Home;
