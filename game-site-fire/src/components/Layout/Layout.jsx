import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ user, setUser }) => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar user={user} setUser={setUser} />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;