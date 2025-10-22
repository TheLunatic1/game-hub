import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = 'Login - Gamehub';
    const fromForget = location.state?.email;
    if (fromForget) setEmail(fromForget);
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Login failed: ' + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      setUser(userCredential.user);
      toast.success('Logged in with Google!');
      navigate('/');
    } catch (error) {
      toast.error('Google login failed: ' + error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4 bg-gray-900 text-white min-h-screen"
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-[#00FF6F]">Login</h1>
      <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full bg-gray-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full bg-gray-800 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn bg-[#D600FF] text-white w-full hover:bg-[#B000D0]">
          Login
        </button>
      </form>
      <div className="flex justify-center items-center">
        <button
        onClick={handleGoogleLogin}
        className="btn bg-blue-600 text-white w-full max-w-md mx-auto mt-4 hover:bg-blue-700"
      >
        Login with Google
      </button>
      </div>
      
      <p className="text-center mt-4">
        Don't have an account?{' '}
        <NavLink to="/register" className="text-[#00FF6F] hover:text-[#D600FF]">
          Register
        </NavLink>
      </p>
      <p className="text-center mt-2">
        <NavLink to="/forget-password" state={{ email }} className="text-[#00FF6F] hover:text-[#D600FF]">
          Forgot Password?
        </NavLink>
      </p>
    </motion.div>
  );
};

export default Login;