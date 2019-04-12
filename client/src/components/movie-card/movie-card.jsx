import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({ movie, onMovieSelect }) => {
  const onClick = () => onMovieSelect(movie);
  return (
    <div className="movie-card" onClick={onClick}>
      <p>{movie.Title}</p>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onMovieSelect: PropTypes.func.isRequired
};
export { MovieCard };
