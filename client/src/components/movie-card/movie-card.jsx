import React from 'react';

const MovieCard = ({ movie, onMovieSelect }) => {
  return (
    <div className="movie-card" onClick={() => onMovieSelect(movie)}>
      <p>{movie.Title}</p>
    </div>
  );
};

export { MovieCard };
