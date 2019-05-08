import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';

const GenreView = ({ movie }) => {
  const { Genre } = movie;
  return (
    <Card>
      <Card.Header as="h5">Genre</Card.Header>
      <Card.Body>
        <Card.Title>{Genre.Name}</Card.Title>
        <Card.Text>{Genre.Description}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
};

GenreView.propTypes = {
  movie: PropTypes.shape({
    Genre: PropTypes.object
  }).isRequired
};
export { GenreView };
