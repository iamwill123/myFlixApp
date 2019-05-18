import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
// import { unsplashPlaceholder } from '../../../helpers/placeholder';
// import { isEmpty } from '../../../helpers/isEmpty';
import { getMovieById } from '../../../helpers/movieAPI';
import { isEmpty } from '../../../helpers/isEmpty';

const FavoriteMoviesView = ({ movieId, token }) => {
  const [movie, setMovie] = useState('');
  useEffect(() => {
    getMovieById(movieId, token).then(result => {
      setMovie(result.data);
    });
    return () => {};
  }, [movieId, token]);

  if (isEmpty(movie)) return 'Loading...';

  return (
    <Card border="dark" key={movie._id}>
      {/* <Card.Img variant="top" src={unsplashPlaceholder('', movie.Title)} /> */}
      <Card.Header as="h5">{movie.Title}</Card.Header>
      <Card.Body>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Card.Text style={{ marginBottom: '5%' }}>
            {movie.Director.Name}
          </Card.Text>
        </Link>
        <Card.Text style={{ marginBottom: '0' }}>{movie.Description}</Card.Text>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Card.Text style={{ marginBottom: '5%' }}>
            <small className="text-muted">#{movie.Genre.Name}</small>
          </Card.Text>
        </Link>
        <Link to={`/movies/${movie._id}`}>
          <Button variant="outline-dark">Read more</Button>
        </Link>
      </Card.Body>
      <Card.Footer>
        {/* <small className="text-muted">Last updated 3 mins ago</small> */}
        <small className="text-muted">Released: {movie.ReleaseYear}</small>
      </Card.Footer>
    </Card>
  );
};

FavoriteMoviesView.propTypes = {
  movieId: PropTypes.any.isRequired
};
export { FavoriteMoviesView };
