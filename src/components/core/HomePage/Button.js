


import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, active = false, linkto = "#" }) => {
  return (
    <Link to={linkto} role="button" aria-label={children || "button"}>
      <div
        className={`inline-block px-6 py-2 md:py-3 md:px-8 text-sm md:text-base font-semibold rounded-full
        transition-transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400
        hover:scale-95 shadow-sm
        ${active
          ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
          : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:from-gray-300 hover:to-gray-400"
        }`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
