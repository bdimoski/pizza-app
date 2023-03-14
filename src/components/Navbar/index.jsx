import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="flex flex-wrap items-center md:justify-around justify-between p-6 bg-gradient-to-r from-teal-400 to-teal-500">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-white font-bold text-xl md:text-2xl mr-4">
            SizzleSlice
          </h1>
        </Link>
      </div>
      <div className="md:hidden">
        <button
          type="button"
          onClick={toggleMenu}
          className="block text-gray-200 hover:text-white focus:text-white focus:outline-none"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {showMenu ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.293 4.293a1 1 0 0 0-1.414 0L12 10.586 5.707 4.293A1 1 0 0 0 4.293 5.707L10.586 12l-6.293 6.293a1 1 0 1 0 1.414 1.414L12 13.414l6.293 6.293a1 1 0 0 0 1.414-1.414L13.414 12l6.293-6.293a1 1 0 0 0 0-1.414z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm1 5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H5z"
              />
            )}
          </svg>
        </button>
      </div>
      <div
        className={`${
          showMenu ? "block" : "hidden"
        } md:flex md:items-center md:justify-end w-full md:w-auto`}
      >
        <div className="flex flex-col md:flex-row items-center md:gap-8">
          <Link
            to="/"
            className="text-white hover:text-gray-200 font-medium md:text-lg py-2 md:py-0"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-gray-200 font-medium md:text-lg py-2 md:py-0"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-gray-200 font-medium md:text-lg py-2 md:py-0"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
