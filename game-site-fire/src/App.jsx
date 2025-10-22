import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Games from './components/Games/Games';
import GameDetails from './components/GameDetails/GameDetails';
import MyProfile from './components/MyProfile/MyProfile';
import UpdateInfo from './components/UpdateInfo/UpdateInfo';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import Developers from './components/Developers/Developers';
import ErrorPage from './components/ErrorPage/ErrorPage';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const router = createBrowserRouter([
    {
      element: <Layout user={user} setUser={setUser} />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/games', element: <Games /> },
        { path: '/games/:id', element: <GameDetails user={user} /> },
        { path: '/my-profile', element: <MyProfile user={user} /> },
        { path: '/update-info', element: <UpdateInfo user={user} setUser={setUser} /> },
        { path: '/login', element: <Login setUser={setUser} /> },
        { path: '/register', element: <Register setUser={setUser} /> },
        { path: '/forget-password', element: <ForgetPassword /> },
        { path: '/developers', element: <Developers /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;