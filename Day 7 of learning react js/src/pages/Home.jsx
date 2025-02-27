import React from "react";
import CounterDisplays from "../components/CounterDisplays";
import CounterControls from "../components/CounterControls";

const Home = () => {
  return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-900 p-6">
    <h1 className="text-3xl font-bold text-gray-800  dark:text-white mb-4">Global Counter App</h1>
    <CounterDisplays/>
    <CounterControls/>
  </div>;
};

export default Home;
