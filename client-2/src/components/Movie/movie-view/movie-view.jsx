import React from 'react';
import Media from 'react-bootstrap/Media';
import Button from 'react-bootstrap/Button';
import { isEmpty } from '../../../helpers/isEmpty';
import { placeholder } from '../../../helpers/placeholder';

const MovieView = ({ movie }) => {
  if (isEmpty(movie)) return <p>loading movie...</p>;
  const goBack = () => {
    window.history.back();
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

export { MovieView };
