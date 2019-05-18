import { combineReducers } from 'redux';
import {
  SET_FILTER,
  SET_SORT_COLUMN,
  SET_MOVIES,
  SET_USER,
  SET_USERS,
  LOADING_START,
  LOADING_FINISH,
  LOADING_ERROR
} from '../actions/actions';

const asyncLoadingStarted = (state = false, action) => {
  switch (action.type) {
    case LOADING_START:
      return action.value;
    default:
      return state;
  }
};

const asyncLoadingFinished = (state = false, action) => {
  switch (action.type) {
    case LOADING_FINISH:
      return action.value;
    default:
      return state;
  }
};

const asyncLoadingError = (state = false, action) => {
  switch (action.type) {
    case LOADING_ERROR:
      return action.value;
    default:
      return state;
  }
};

const visibilityFilter = (state = '', action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
};

const sortColumn = (state = 'Title', action) => {
  switch (action.type) {
    case SET_SORT_COLUMN:
      return action.value;
    default:
      return state;
  }
};

const movies = (state = [], action) => {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
};

const users = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.value;
    default:
      return state;
  }
};

// combined reducer
// const moviesAppWithoutRedux = (state = {}, action) => {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     sortColumn: sortColumn(state.sortColumn, action),
//     movies: movies(state.movies, action)
//   };
// };

const moviesApp = combineReducers({
  asyncLoadingStarted,
  asyncLoadingFinished,
  asyncLoadingError,
  visibilityFilter,
  sortColumn,
  movies,
  user,
  users
});

export default moviesApp;
