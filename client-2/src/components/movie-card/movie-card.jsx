import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Card border="info">
      <Card.Header as="h5">{movie.Title}</Card.Header>
      <Card.Body>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Card.Text style={{marginBottom: '5%'}}>{movie.Director.Name}</Card.Text>
        </Link>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${movie._id}`}>
          <Button variant="outline-dark">Read more</Button>
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
    Title: PropTypes.string
  }).isRequired
};
export { MovieCard };
