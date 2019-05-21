import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';
import { isEmpty } from '../../../helpers/isEmpty';

const GenreView = ({ movies, history, match }) => {
  if (isEmpty(movies)) return <p>loading movie...</p>;
  let movie = movies.find(m => m.Genre.Name === match.params.name);

  const { Genre } = movie;

  const goBack = () => {
    history.goBack();
  };
  return (
    <Card>
      <Card.Header as="h5">Genre</Card.Header>
      <Card.Body>
        <Card.Title>{Genre.Name}</Card.Title>
        <Card.Text>{Genre.Description}</Card.Text>
        <Button variant="outline-dark" onClick={goBack}>
          Back
        </Button>
      </Card.Body>

      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
};

GenreView.propTypes = {
  movies: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default connect(({ movies }) => ({ movies }))(GenreView);
