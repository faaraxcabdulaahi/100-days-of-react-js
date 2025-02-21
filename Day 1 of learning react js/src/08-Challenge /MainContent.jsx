import React from "react";

const MainContent = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg my-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Why Are You Excited About Learning React.js?
      </h1>
      <ol className="list-decimal list-inside space-y-4 text-lg text-gray-700">
        <li className="bg-gray-50 p-4 rounded-lg shadow-sm">
          I am learning it to acquire a valuable digital skill.
        </li>
        <li className="bg-gray-50 p-4 rounded-lg shadow-sm">
          I am learning it to secure a good income while I am young.
        </li>
        <li className="bg-gray-50 p-4 rounded-lg shadow-sm">
          I am learning it to land a great job and avoid unemployment.
        </li>
      </ol>
    </div>
  );
};

export default MainContent;