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
      toast.error('Logout failed: ' + error.message);
    }
  };

  return (
    <div className="navbar bg-gray-900 shadow-md text-white sticky top-0 z-50">
      <div className="flex-1">
        <NavLink to="/" className="btn border-none bg-transparent shadow-none text-xl text-[#00FF6F] font-bold">
          <img className="h-10" src={"https://pbs.twimg.com/profile_images/1637807844035633153/LHlMBdqi_400x400.jpg"} alt="Gamehub Logo" />
          Gamehub
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-[#D600FF] font-bold' : 'text-white hover:text-[#D600FF]'}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/games" className={({ isActive }) => isActive ? 'text-[#D600FF] font-bold' : 'text-white hover:text-[#D600FF]'}>
              Games
            </NavLink>
          </li>
          <li>
            <NavLink to="/developers" className={({ isActive }) => isActive ? 'text-[#D600FF] font-bold' : 'text-white hover:text-[#D600FF]'}>
              Developers
            </NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink to="/my-profile" className={({ isActive }) => isActive ? 'text-[#D600FF] font-bold' : 'text-white hover:text-[#D600FF]'}>
                  My Profile
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="text-white hover:text-[#D600FF]">
                  Logout
                </button>
              </li>
              <li>
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full ml-4 cursor-pointer"
                  onClick={() => navigate('/my-profile')}
                />
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className={({ isActive }) => isActive ? 'text-[#D600FF] font-bold' : 'text-white hover:text-[#D600FF]'}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={({ isActive }) => isActive ? 'text-[#D600FF] font-bold' : 'text-white hover:text-[#D600FF]'}>
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;