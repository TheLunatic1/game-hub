import React from 'react';

export async function loader() {
  const response = await fetch('/games.json');
  if (!response.ok) throw new Error('Failed to fetch games');
  return response.json();
}

const Games = () => <div>Games Page</div>;

export default Games;