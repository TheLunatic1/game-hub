import React from 'react';
import { useParams } from 'react-router-dom';

export async function loader({ params }) {
  const response = await fetch('/games.json');
  if (!response.ok) throw new Error('Failed to fetch games');
  const games = await response.json();
  const game = games.find((game) => game.id === params.id);
  if (!game) throw new Error('Game not found');
  return game;
}

const GameDetails = ({ user }) => {
  return <div>Game Details Page</div>;
};

export default GameDetails;