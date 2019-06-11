import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

// import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { theMovieDBSearch, poster, checkStatus } from '../../../helpers/apiKey';
import Octicon, { Star, Zap } from '@githubprimer/octicons-react';
import { addToFavorites, removeFromFavorites } from '../../../helpers/movieAPI';
import TooltipView from '../../ReusableComponents/tooltip-view/tooltip-view';

const MovieCard = ({ movie, currentUser }) => {
  // console.log('TCL: MovieCard -> currentUser', currentUser);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [avgVote, setAvgVote] = useState('');

  useEffect(() => {
    theMovieDBSearch(movie.Title)
      .then(checkStatus)
      .then(result => {
        const {
          data: { results }
        } = result;
        let topResult = results[0];
        // console.log(topResult);
        setImageUrl(poster.loadSize('w400', topResult.poster_path));
        setAvgVote(topResult.vote_average);
      });
    return () => {};
  }, [movie.Title]);

  const onAddToFavorite = (username, movieId) => {
    setLoading(true);
    addToFavorites(username, movieId)
      .then(checkStatus)
      .then(res => {
        console.log('added to fav', res);
        setLoading(false);
        // add async loading with redux and way to fetch data.
      })
      .catch(e => {
        setLoading(false);
        console.error('onAddToFavorite', e);
      });
  };

  const onRemoveFavorite = (username, movieId) => {
    setLoading(true);
    removeFromFavorites(username, movieId)
      .then(checkStatus)
      .then(res => {
        console.log('removed from fav', res);
        setLoading(false);
        // add async loading with redux and way to fetch data.
      })
      .catch(e => {
        setLoading(false);
        console.error('onAddToFavorite', e);
      });
  };

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
        <Link to={`/myFlixApp/directors/${movie.Director.Name}`}>
          <Card.Text style={{ marginBottom: '5%' }}>
            {movie.Director.Name}
          </Card.Text>
        </Link>
        <Card.Text style={{ marginBottom: '0' }}>{movie.Description}</Card.Text>
        <Link to={`/myFlixApp/genres/${movie.Genre.Name}`}>
          <Card.Text style={{ marginBottom: '5%' }}>
            <small className="text-muted">#{movie.Genre.Name}</small>
          </Card.Text>
        </Link>
        <Link to={`/myFlixApp/movies/${movie._id}`}>
          <Button variant="outline-dark">Read more</Button>
        </Link>
        {currentUser.FavoriteMovies.find(m => m === movie._id) ? (
          <TooltipView
            placement={'right'}
            tooltipText={'Remove from favorites'}
          >
            <Button
              variant="outline-danger"
              className="ml-1"
              onClick={() => onRemoveFavorite(currentUser.Username, movie._id)}
            >
              {loading ? (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <Octicon icon={Zap} size="small" verticalAlign="middle" />
              )}
            </Button>
          </TooltipView>
        ) : (
          <TooltipView placement={'bottom'} tooltipText={'Add to favorites'}>
            <Button
              variant="outline-info"
              className="ml-1"
              onClick={() => onAddToFavorite(currentUser.Username, movie._id)}
            >
              {loading ? (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <Octicon icon={Star} size="small" verticalAlign="middle" />
              )}
            </Button>
          </TooltipView>
        )}
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
