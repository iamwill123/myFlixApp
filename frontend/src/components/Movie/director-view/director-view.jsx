import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';
import { isEmpty } from '../../../helpers/isEmpty';

const DirectorView = ({ movies, history, match }) => {
  if (isEmpty(movies)) return <p>loading movie...</p>;
  let movie = movies.find(m => m.Director.Name === match.params.name);
  console.log(movie);
  const { Director } = movie;

  const goBack = () => {
    history.goBack();
  };

  return (
    <Card>
      <Card.Header as="h5">Director</Card.Header>
      <Card.Body>
        <Card.Title>{Director.Name}</Card.Title>
        <Card.Text>{Director.Bio}</Card.Text>
        <Card.Text>{Director.Birth}</Card.Text>
        <Button variant="outline-dark" onClick={goBack}>
          Back
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
};

DirectorView.propTypes = {
  movies: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default connect(({ movies }) => ({ movies }))(DirectorView);
