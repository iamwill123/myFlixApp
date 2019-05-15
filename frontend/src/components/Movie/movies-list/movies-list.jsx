import React from 'react';
import { connect } from 'react-redux';
import { MovieCard } from '../movie-card/movie-card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardColumns from 'react-bootstrap/CardColumns';

// mapStateToProps
const mapState = state => {
  console.warn(state);
  const { movies, sortColumn } = state;

  let sortedMovies = movies.concat().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0;
  });
  console.log('sortedMovies', sortedMovies);
  return { movies: sortedMovies };
};

const MoviesList = props => {
  const { movies } = props;
  console.log(movies);

  if (!movies) return <p>loading...</p>;
  return (
    <Row>
      <Col>
        <CardColumns>
          {movies.map(movie => {
            return <MovieCard movie={movie} key={movie._id} />;
          })}
        </CardColumns>
      </Col>
    </Row>
  );
};

// Notes:
// The first argument, mapStateToProps, is a function that converts or transforms the store into props that the MoviesList component will use. Remember that the store contains your application's state, which is why this function is called mapStateToProps.
export default connect(mapState)(MoviesList);
