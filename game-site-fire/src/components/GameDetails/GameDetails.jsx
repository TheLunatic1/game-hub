import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const GameDetails = ({ user }) => {
  const [game, setGame] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
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
      })
      .catch((error) => {
        console.error('Error fetching game:', error);
        navigate('/'); // Redirect to home on error
      });
  }, [user, id, navigate]);

  if (!game) return <div className="text-center text-white">Loading...</div>;

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
          src={game.coverPhoto || 'https://via.placeholder.com/400x300?text=Game'}
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