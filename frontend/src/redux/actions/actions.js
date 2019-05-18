const SET_MOVIES = 'SET_MOVIES';
const SET_FILTER = 'SET_FILTER';
const SET_SORT_COLUMN = 'SET_SORT_COLUMN';
const SET_USER = 'SET_USER';
const SET_USERS = 'SET_USERS';
const LOADING_START = 'LOADING_START';
const LOADING_FINISH = 'LOADING_FINISH';
const LOADING_ERROR = 'LOADING_ERROR';

const setMovies = value => ({
  type: SET_MOVIES,
  value
});

const setFilter = value => ({ type: SET_FILTER, value });

const setSortColumn = value => ({ type: SET_SORT_COLUMN, value });

const setUser = value => ({ type: SET_USER, value });

const setUsers = value => ({ type: SET_USERS, value });

const loadingStarted = value => ({ type: LOADING_START, value });

const loadingFinished = value => ({ type: LOADING_FINISH, value });

const loadingError = value => ({ type: LOADING_ERROR, value });

export {
  LOADING_START,
  LOADING_FINISH,
  LOADING_ERROR,
  SET_MOVIES,
  SET_FILTER,
  SET_SORT_COLUMN,
  SET_USER,
  SET_USERS,
  loadingStarted,
  loadingFinished,
  loadingError,
  setMovies,
  setFilter,
  setSortColumn,
  setUser,
  setUsers
};
