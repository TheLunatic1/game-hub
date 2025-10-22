import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  useEffect(() => {
    document.title = '404 - Gamehub';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="container mx-auto py-12 px-4 bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center"
    >
      <h1 className="text-6xl font-bold text-[#00FF6F] mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-center mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <NavLink
        to="/"
        className="btn bg-[#D600FF] text-white hover:bg-[#B000D0]"
      >
        Back to Home
      </NavLink>
    </motion.div>
  );
};

export default ErrorPage;