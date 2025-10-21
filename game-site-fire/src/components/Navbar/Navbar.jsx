import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import logo from '../../assets/react.svg';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <div className="navbar bg-gray-900 shadow-md text-white">
      <div className="flex-1">
        <NavLink to="/" className="btn border-none bg-transparent shadow-none text-xl text-neon-green">
          <img className='h-[40px]' src={logo} alt="Gamehub Logo" />
          Gamehub
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-neon-purple font-bold' : 'text-white'}>Home</NavLink></li>
          <li><NavLink to="/games" className={({ isActive }) => isActive ? 'text-neon-purple font-bold' : 'text-white'}>Games</NavLink></li>
          <li><NavLink to="/developers" className={({ isActive }) => isActive ? 'text-neon-purple font-bold' : 'text-white'}>Developers</NavLink></li>
          {user ? (
            <>
              <li><NavLink to="/my-profile" className={({ isActive }) => isActive ? 'text-neon-purple font-bold' : 'text-white'}>My Profile</NavLink></li>
              <li onClick={handleLogout}><a>Logout</a></li>
              <img src={user.photoURL || 'default-avatar.png'} alt="Profile" className="w-10 h-10 rounded-full ml-4 cursor-pointer" onClick={() => navigate('/my-profile')} />
            </>
          ) : (
            <>
              <li><NavLink to="/login" className={({ isActive }) => isActive ? 'text-neon-purple font-bold' : 'text-white'}>Login</NavLink></li>
              <li><NavLink to="/register" className={({ isActive }) => isActive ? 'text-neon-purple font-bold' : 'text-white'}>Register</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;