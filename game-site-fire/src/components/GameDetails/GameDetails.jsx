import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { motion } from 'framer-motion';

const GameDetails = ({ user }) => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        setLoading(false);
        navigate('/login');
      } else {
        fetch('/games.json')
          .then((response) => {
            if (!response.ok) throw new Error('Failed to fetch games');
            return response.json();
          })
          .then((data) => {
            const selectedGame = data.find((game) => game.id === id);
            if (!selectedGame) throw new Error('Game not found');
            setGame(selectedGame);
            document.title = `${selectedGame.title} - Gamehub`;
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching game:', error);
            navigate('/');
            setLoading(false);
          });
      }
    });

    return () => unsubscribe();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p className="text-center text-[#00FF6F] text-xl">Loading...</p>
      </div>
    );
  }

  if (!game) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4 bg-gray-900 text-white min-h-screen"
    >
      <h1 className="text-4xl font-bold mb-8 text-[#00FF6F]">{game.title}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={game.coverPhoto}
          alt={game.title}
          className="w-full md:w-1/2 h-96 object-cover rounded-lg"
        />
        <div className="space-y-4">
          <p><strong>Category:</strong> {game.category}</p>
          <p><strong>Rating:</strong> {game.ratings}</p>
          <p><strong>Developer:</strong> {game.developer}</p>
          <p>{game.description}</p>
          <a
            href={game.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#D600FF] text-white hover:bg-[#B000D0]"
          >
            Download
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default GameDetails;