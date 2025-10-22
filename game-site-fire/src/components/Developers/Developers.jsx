import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Developers = () => {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    document.title = 'Developers - Gamehub';
    fetch('/games.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch games');
        return response.json();
      })
      .then((data) => {
        const uniqueDevelopers = [...new Set(data.map((game) => game.developer))].map((developer) => ({
          name: developer,
          description: `Games by ${developer} are available on Gamehub!`,
        }));
        setDevelopers(uniqueDevelopers);
      })
      .catch((error) => console.error('Error fetching developers:', error));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="container mx-auto py-12 px-4 bg-gray-900 text-white min-h-screen"
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-[#00FF6F]">Game Developers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.length > 0 ? (
          developers.map((developer, index) => (
            <div key={index} className="card bg-gray-800 shadow-xl text-white">
              <div className="card-body">
                <h2 className="card-title text-[#00FF6F]">{developer.name}</h2>
                <p>{developer.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Loading developers...</p>
        )}
      </div>
    </motion.div>
  );
};

export default Developers;