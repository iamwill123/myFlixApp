import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { theMovieDBSearch, poster } from '../../../helpers/apiKey';
import Octicon, { Star, Zap } from '@githubprimer/octicons-react';
import { addToFavorites } from '../../../helpers/movieAPI';

const MovieCard = ({ movie, currentUser }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [avgVote, setAvgVote] = useState('');

  useEffect(() => {
    theMovieDBSearch(movie.Title).then(result => {
      if (result.status === 200) {
        const {
          data: { results }
        } = result;
        let topResult = results[0];
        // console.log(topResult);
        setImageUrl(poster.loadSize('w400', topResult.poster_path));
        setAvgVote(topResult.vote_average);
      }
    });
    return () => {};
  }, [movie.Title]);

  const addToFavs = (username, movieId) => addToFavorites(username, movieId);

  return (
    <Card border="info">
      <Card.Img
        style={imageUrl ? null : styles.imgPlaceholder}
        variant="top"
        src={imageUrl}
      />
      <Card.Header as="h4">
        {movie.Title} <sup>[{avgVote}]</sup>
      </Card.Header>
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
        <Button
          variant="outline-info"
          className="ml-1"
          onClick={() => addToFavs(currentUser.Username, movie._id)}
        >
          <Octicon icon={Star} size="small" verticalAlign="middle" />
        </Button>
      </Card.Body>
      <Card.Footer>
        {/* <small className="text-muted">Last updated 3 mins ago</small> */}
        <small className="text-muted">Released: {movie.ReleaseYear}</small>
      </Card.Footer>
    </Card>
  );
};

const styles = {
  imgPlaceholder: {
    backgroundColor: 'black',
    width: '100%',
    height: '300px'
  }
};
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired
};
export { MovieCard };
