import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const MovieCard = ({ movie, onMovieSelect }) => {
  const onClick = () => onMovieSelect(movie);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button variant="primary" onClick={onClick}>
          View
        </Button>
        <Card.Text>
          {/* <small className="text-muted">Last updated 3 mins ago</small> */}
          <small className="text-muted">Released: {movie.ReleaseYear}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onMovieSelect: PropTypes.func.isRequired
};
export { MovieCard };
