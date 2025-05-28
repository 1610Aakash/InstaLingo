


import React, { useState } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import Logo from '../../assets/Logo/logo.jpg';
import { NavbarLinks } from '../../data/navbar-links';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const matchRoute = (route) => {
    return matchPath({ path: route, end: true }, location.pathname);
  };

  return (
    <div className="shadow-md bg-white w-full z-50 relative">
      <div className="flex items-center justify-between w-11/12 max-w-maxContent mx-auto py-3 relative">

        {/* Logo */}
        <Link to="/">
          <img
            src={Logo}
            width={50}
            height={50}
            loading="lazy"
            alt="Logo"
            className="rounded-full object-cover"
          />
        </Link>

        {/* Desktop NavLinks */}
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-x-10">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>
                  <p
                    className={`cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 ${
                      matchRoute(link.path)
                        ? 'text-black font-semibold hover:text-blue-800'
                        : 'text-gray-700'
                    }`}
                  >
                    {link.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-x-4">
          <Link to="/login">
            <button className="px-4 py-1 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-1 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {isMenuOpen && (
        <div>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="md:hidden fixed top-16 left-0 right-0 bg-white z-50 flex flex-col items-center gap-4 py-4 shadow-md transition-all duration-300">
            {NavbarLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg ${
                  matchRoute(link.path) ? 'text-blue-700 font-semibold' : 'text-gray-700'
                }`}
              >
                {link.title}
              </Link>
            ))}
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <button className="w-28 px-4 py-1 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition">
                Login
              </button>
            </Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
              <button className="w-28 px-4 py-1 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
