import React from 'react';
import { connect } from 'react-redux';
import { MovieCard } from '../movie-card/movie-card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardColumns from 'react-bootstrap/CardColumns';
import PropTypes from 'prop-types';
import SortColumnDropdown from '../../GlobalComponents/sort-column-dropdown';

const getFirstKeyValueOfNestedObj = obj => Object.entries(obj)[0][1];

// mapStateToProps
const mapState = state => {
  const { user, movies, visibilityFilter, sortColumn } = state;
  const aToZAcendingOrder = (a, b) => {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0;
  };
  let moviesToShow = movies.concat().sort(aToZAcendingOrder);

  // filter search according to sortColumn result.
  if (visibilityFilter !== '') {
    const bySortSelection = movie => {
      if (typeof movie[sortColumn] === 'object') {
        return getFirstKeyValueOfNestedObj(movie[sortColumn])
          .toLowerCase()
          .includes(visibilityFilter);
      }
      return (
        movie[sortColumn].includes(visibilityFilter) ||
        movie[sortColumn].toLowerCase().includes(visibilityFilter)
      );
    };
    moviesToShow = moviesToShow.filter(bySortSelection);
  }
  return { movies: moviesToShow, currentUser: user };
};

const MoviesList = props => {
  // console.log(props);
  const { movies, currentUser, match } = props;
  // console.log('movie-list', match);
  if (!movies) return <p>loading...</p>;

  const movieCard = movie => {
    return (
      <MovieCard
        currentUser={currentUser}
        movie={movie}
        key={movie._id}
        match={match}
      />
    );
  };

  return (
    <Row>
      <Col>
        <SortColumnDropdown />
        <CardColumns>{movies.map(movieCard)}</CardColumns>
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
