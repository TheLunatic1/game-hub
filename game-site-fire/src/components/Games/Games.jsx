import React, { useState, useEffect } from 'react';
import GameCard from '../GameCard/GameCard';
import { motion } from 'framer-motion';

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    document.title = 'Games - Gamehub';
    fetch('/games.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch games');
        return response.json();
      })
      .then((data) => setGames(data))
      .catch((error) => console.error('Error fetching games:', error));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="container mx-auto py-12 px-4 bg-gray-900 text-white min-h-screen"
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-[#00FF6F]">All Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.length > 0 ? (
          games.map((game) => <GameCard key={game.id} game={game} />)
        ) : (
          <p className="text-center">Loading games...</p>
        )}
      </div>
    </motion.div>
  );
};

export default Games;