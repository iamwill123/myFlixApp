import axios from 'axios';
// OMDb API Key
// const api = 'http://www.omdbapi.com/?19aaf52d&';
// https://developers.themoviedb.org/3/search/search-movies

const apiKey = process.env.REACT_APP_THE_MOVIE_DB_API_KEY;

const theMovieDBSearch = title =>
  axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${title}&page=1&include_adult=false`
  );

const poster = {
  loadSize: (size = 'w300', posterPath = '') => {
    return `http://image.tmdb.org/t/p/${size}${posterPath}`;
  },
  loadOriginalSize: (posterPath = '') => {
    return `http://image.tmdb.org/t/p/original${posterPath}`;
  }
};

export { theMovieDBSearch, poster };
