import React from "react";
import { NavLink } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-100 to-red-200">
      <h1 className="text-6xl font-bold text-red-800">404</h1>
      <p className="text-2xl text-red-600">Page Not Found</p>
      <NavLink
        to="/"
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
      >
        Go Home
      </NavLink>
    </div>
  );
};

export default NotFound;
