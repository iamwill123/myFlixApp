import React from 'react';
import { connect } from 'react-redux';
import { MovieCard } from '../movie-card/movie-card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardColumns from 'react-bootstrap/CardColumns';
import PropTypes from 'prop-types';
import SortColumnDropdown from '../../GlobalComponents/sort-column-dropdown';
// mapStateToProps
const mapState = state => {
  const { movies, visibilityFilter, sortColumn } = state;

  let moviesToShow = movies.concat().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0;
  });

  if (visibilityFilter !== '') {
    moviesToShow = moviesToShow.filter(
      movie =>
        movie.Title.includes(visibilityFilter) ||
        movie.Title.toLowerCase().includes(visibilityFilter)
    );
  }
  return { movies: moviesToShow };
};

const MoviesList = props => {
  const { movies } = props;

  if (!movies) return <p>loading...</p>;
  return (
    <Row>
      <Col>
        <SortColumnDropdown />
        <CardColumns>
          {movies.map(movie => {
            return <MovieCard movie={movie} key={movie._id} />;
          })}
        </CardColumns>
      </Col>
    </Row>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

// Notes:
// The first argument, mapStateToProps, is a function that converts or transforms the store into props that the MoviesList component will use. Remember that the store contains your application's state, which is why this function is called mapStateToProps.
export default connect(mapState)(MoviesList);
