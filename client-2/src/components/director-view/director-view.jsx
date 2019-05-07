import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';

const DirectorView = ({ movie }) => {
  const { Director } = movie;
  return (
    <Card className="text-center">
      <Card.Header as="h5">Director</Card.Header>
      <Card.Body>
        <Card.Title>{Director.Name}</Card.Title>
        <Card.Text>{Director.Bio}</Card.Text>
        <Card.Text>{Director.Birth}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
};

DirectorView.propTypes = {
  movie: PropTypes.shape({
    Director: PropTypes.object
  }).isRequired
};
export { DirectorView };
