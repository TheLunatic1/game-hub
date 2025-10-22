import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const GameCard = ({ game }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="card bg-gray-800 shadow-xl text-white"
    >
      <figure>
        <img
          src={game.coverPhoto || 'https://via.placeholder.com/300x200?text=Game'}
          alt={game.title}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-[#00FF6F]">{game.title}</h2>
        <p className="text-sm">{game.category}</p>
        <p className="text-sm">Rating: {game.ratings}</p>
        <div className="card-actions justify-end">
          <NavLink to={`/games/${game.id}`} className="btn bg-[#D600FF] text-white hover:bg-[#B000D0]">
            Details
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;