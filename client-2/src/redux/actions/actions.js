const SET_MOVIES = 'SET_MOVIES';
const SET_FILTER = 'SET_FILTER';
const SET_SORT_COLUMN = 'SET_SORT_COLUMN';

const setMovies = value => {
  return { type: SET_MOVIES, value };
};

const setFilter = value => {
  return { type: SET_FILTER, value };
};

const setSortColumn = value => {
  return { type: SET_SORT_COLUMN, value };
};

export {
  SET_MOVIES,
  SET_FILTER,
  SET_SORT_COLUMN,
  setMovies,
  setFilter,
  setSortColumn
};
