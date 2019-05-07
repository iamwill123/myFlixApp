import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${movie._id}`}>
          <Button variant="link">View</Button>
        </Link>
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
  }).isRequired
};
export { MovieCard };
