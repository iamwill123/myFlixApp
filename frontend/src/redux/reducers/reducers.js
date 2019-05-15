import { combineReducers } from 'redux';
import { SET_FILTER, SET_SORT_COLUMN, SET_MOVIES } from '../actions/actions';

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

// combined reducer
// const moviesAppWithoutRedux = (state = {}, action) => {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     sortColumn: sortColumn(state.sortColumn, action),
//     movies: movies(state.movies, action)
//   };
// };

const moviesApp = combineReducers({
  visibilityFilter,
  sortColumn,
  movies
});
export default moviesApp;
