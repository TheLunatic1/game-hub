import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4 text-[#00FF6F]">© 2025 Gamehub. All rights reserved.</p>
        <div className="space-x-4">
          <NavLink to="/" className="text-white hover:text-[#D600FF]">
            Home
          </NavLink>
          <NavLink to="/games" className="text-white hover:text-[#D600FF]">
            Games
          </NavLink>
          <NavLink to="/developers" className="text-white hover:text-[#D600FF]">
            Developers
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;