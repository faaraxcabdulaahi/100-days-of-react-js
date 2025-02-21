import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
          alt="React Logo"
          className="size-10"
        />
        <ul className="flex space-x-6">
          <li className="text-lg font-medium text-gray-700 hover:text-blue-600 transition duration-200">
            <a href="#home">Home</a>
          </li>
          <li className="text-lg font-medium text-gray-700 hover:text-blue-600 transition duration-200">
            <a href="#about">About</a>
          </li>
          <li className="text-lg font-medium text-gray-700 hover:text-blue-600 transition duration-200">
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;