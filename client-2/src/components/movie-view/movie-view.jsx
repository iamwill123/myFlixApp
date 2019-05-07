import React from 'react';
import Media from 'react-bootstrap/Media';

const MovieView = ({ movie }) => {
  if (!movie) return <p>loading movie...</p>;
  return (
    <Media>
      <img
        width={64}
        height={64}
        className="mr-3"
        src={movie.ImagePath}
        alt="Generic placeholder"
      />
      <Media.Body>
        <h5>{movie.Title}</h5>
        <p>
          {movie.Description}
          {/* <p>{movie.Director.Name}</p> <p>{movie.Genre.Name}</p> */}
        </p>
      </Media.Body>
    </Media>
  );
};

export { MovieView };
