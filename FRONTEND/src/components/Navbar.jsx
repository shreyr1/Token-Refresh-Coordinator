import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black slidedown">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-white"
        >
          LOGIN
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link to="/" className="text-white transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-white transition-colors">
            About
          </Link>
          <Link to="/services" className="text-white transition-colors">
            Services
          </Link>
          <Link to="/contact" className="text-white transition-colors">
            Contact
          </Link>
          <Link to="/meet-the-team" className="text-white transition-colors">
            GitHub Connect
          </Link>
        </div>

        <div className="flex items-center gap-5 text-sm">
          <Link to="/login" className="text-zinc-400 hover:text-white transition-colors font-medium">
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2.5 rounded bg-white text-black font-medium hover:opacity-90 hover:font-bold duration0-30 cursor-pointer "
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
