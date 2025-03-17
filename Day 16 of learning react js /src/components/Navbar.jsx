import React, { useState } from "react";
import { NavLink } from "react-router";
import CloseIcon from "../icons/CloseIcon";
import HamburgerIcon from "../icons/HamburgerIcon";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-400 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex items-center text-white hover:text-blue-200 transition duration-300"
            >
              <span className="font-semibold text-lg">My App</span>
            </NavLink>
          </div>

          {/* Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm md:text-md font-medium transition duration-300 ${
                  isActive
                    ? "text-white bg-blue-700"
                    : "text-blue-100 hover:text-white hover:bg-blue-700"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm md:text-md font-medium transition duration-300 ${
                  isActive
                    ? "text-white bg-green-700"
                    : "text-green-100 hover:text-white hover:bg-green-700"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm md:text-md font-medium transition duration-300 ${
                  isActive
                    ? "text-white bg-purple-600"
                    : "text-purple-100 hover:text-white hover:bg-purple-700"
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink to="/features" className={({isActive})=> `px-3 py-2 rounded-md text-sm md:text-md font-medium transition duration-300 ${isActive ? "text-white bg-orange-600" : "text-orange-100 hover:text-white hover:bg-orange-600"}`}>
              Features
            </NavLink>
          </div>

          {/* Hamburger Menu (Visible on Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 focus:outline-none transition duration-300"
            >
              {isOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <HamburgerIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Visible when Hamburger is clicked) */}
      {isOpen && (
        <div className="md:hidden bg-blue-600">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                  isActive
                    ? "text-white bg-blue-700"
                    : "text-blue-100 hover:text-white hover:bg-blue-700"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                  isActive
                    ? "text-white bg-green-700"
                    : "text-green-100 hover:text-white hover:bg-green-700"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                  isActive
                    ? "text-white bg-purple-700"
                    : "text-purple-100 hover:text-white hover:bg-purple-700"
                }`
              }
            >
              Contact
            </NavLink>
          </div>
          <NavLink
              to="/features"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                  isActive
                    ? "text-white bg-orange-600"
                    : "text-orange-100 hover:text-white hover:bg-orange-600"
                }`
              }
            >
              Features
            </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
