const SET_MOVIES = 'SET_MOVIES';
const SET_FILTER = 'SET_FILTER';
const SET_SORT_COLUMN = 'SET_SORT_COLUMN';
const SET_USER = 'SET_USER';
const SET_USERS = 'SET_USERS';

const setMovies = value => ({
  type: SET_MOVIES,
  value
});

const setFilter = value => ({ type: SET_FILTER, value });

const setSortColumn = value => ({ type: SET_SORT_COLUMN, value });

const setUser = value => ({ type: SET_USER, value });

const setUsers = value => ({ type: SET_USERS, value });

export {
  SET_MOVIES,
  SET_FILTER,
  SET_SORT_COLUMN,
  SET_USER,
  SET_USERS,
  setMovies,
  setFilter,
  setSortColumn,
  setUser,
  setUsers
};
