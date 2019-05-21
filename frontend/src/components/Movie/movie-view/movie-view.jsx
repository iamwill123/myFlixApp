import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import Button from 'react-bootstrap/Button';
import { isEmpty } from '../../../helpers/isEmpty';
import { placeholder } from '../../../helpers/placeholder';

const MovieView = ({ movies, history, match }) => {
  if (isEmpty(movies)) return <p>loading movie...</p>;
  let movie = movies.find(m => m._id === match.params.movieId);
  const goBack = () => {
    history.goBack();
  };
  return (
    <>
      <Media>
        <img
          width={64}
          height={64}
          className="mr-3"
          src={placeholder('100', '000000') || movie.ImagePath}
          alt="movie poster placeholder"
        />
        <Media.Body>
          <h5>{movie.Title}</h5>
          <p>
            {movie.Description}
            {/* <p>{movie.Director.Name}</p> <p>{movie.Genre.Name}</p> */}
          </p>
        </Media.Body>
      </Media>
      <Button variant="outline-dark" onClick={goBack}>
        Back
      </Button>
    </>
  );
};
MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default connect(({ movies }) => ({ movies }))(MovieView);
