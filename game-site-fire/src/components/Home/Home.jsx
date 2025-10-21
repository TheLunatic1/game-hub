import React from 'react';

export async function loader() {
  const response = await fetch('/games.json');
  if (!response.ok) throw new Error('Failed to fetch games');
  const games = await response.json();
  return games.sort((a, b) => b.ratings - a.ratings).slice(0, 3);
}

const Home = () => <div>Home Page</div>;

export default Home;