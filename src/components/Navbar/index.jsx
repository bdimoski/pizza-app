import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex flex-wrap items-center justify-around p-6 bg-gradient-to-r from-teal-400 to-teal-500">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-white font-bold text-xl md:text-2xl mr-4">
            SizzleSlice
          </h1>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row items-center md:gap-8">
        <Link
          to="/"
          className="text-white hover:text-gray-200 font-medium md:text-lg py-2 md:py-0"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-white hover:text-gray-200 font-medium md:text-lg py-2 md:py-0"
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
    </nav>
  );
};

export default Navbar;