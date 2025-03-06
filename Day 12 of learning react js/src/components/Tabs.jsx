import React, { useState } from "react";
import { tabsData } from "../data/Data";

const Tab = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 transition-all duration-300">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8">
          Dynamic Tabs UI
        </h1>

        {/* Tabs Container */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden transition-all duration-300">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {tabsData.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex-1 p-4 text-center font-semibold text-lg transition-all duration-300 ${
                  activeTab === index
                    ? "text-blue-600 dark:text-blue-400 border-b-4 border-blue-600 dark:border-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {tabsData[activeTab].content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab;
