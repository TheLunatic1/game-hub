import React, { useState, useEffect } from 'react';
import GameCard from '../GameCard/GameCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    document.title = 'Home - Gamehub';
    fetch('/games.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch games');
        return response.json();
      })
      .then((data) => setGames(data.sort((a, b) => b.ratings - a.ratings).slice(0, 3)))
      .catch((error) => console.error('Error fetching games:', error));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white"
    >

      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {games.length > 0 ? (
          games.map((game) => (
            <SwiperSlide key={game.id}>
              <img
                src={game.coverPhoto}
                alt={game.title}
                className="w-full h-96 object-cover"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p className="text-center text-white">Loading...</p>
          </SwiperSlide>
        )}
      </Swiper>


      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#00FF6F]">
          Popular Games
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.length > 0 ? (
            games.map((game) => <GameCard key={game.id} game={game} />)
          ) : (
            <p className="text-center">Loading games...</p>
          )}
        </div>
      </div>


      <div className="bg-[#D600FF] py-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Subscribe to Newsletter</h2>
        <p className="mb-4 text-white">Get updates on new games!</p>
        <form className="max-w-md mx-auto space-y-4">
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full bg-gray-800 text-white"
          />
          <button type="submit" className="btn bg-gray-900 text-white w-full hover:bg-gray-700">
            Subscribe
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Home;