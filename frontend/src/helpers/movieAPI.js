import axios from 'axios';
import { localStore } from './localStorageClient';

const api = {
  login: 'https://my-flix-db-11209.herokuapp.com/login',
  user: 'https://my-flix-db-11209.herokuapp.com/user',
  movies: 'https://my-flix-db-11209.herokuapp.com/movies',
  users: 'https://my-flix-db-11209.herokuapp.com/users'
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
};

const registerUser = async (username, password, email, birthday) =>
  await axios.post(api['user'], {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday
  });

const loginUser = async (username, password) =>
  await axios.post(api['login'], {
    Username: username,
    Password: password
  });

const getUser = async (username, token) => {
  try {
    let user = await axios.get(`${api['user']}/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    let response = await checkStatus(user);
    const { data } = response;
    return data;
  } catch (error) {
    console.log('getCurrentUser', error);
  }
};

const addToFavorites = async (username, movieId) => {
  let token = await localStore.token;
  return await axios.post(
    `${api['user']}/${username}/FavoriteMovies/${movieId}`,
    null,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
};

const removeFromFavorites = async (username, movieId) => {
  let token = await localStorage.getItem('token');
  return await axios.delete(
    `${api['user']}/${username}/FavoriteMovies/${movieId}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
};

const getUsers = async token => {
  try {
    let users = await axios.get(api['users'], {
      headers: { Authorization: `Bearer ${token}` }
    });
    let response = await checkStatus(users);
    const { data } = response;
    return data;
  } catch (error) {
    console.log('getUsers', error);
  }
};

const deleteUser = async (username, token) =>
  await axios.delete(`${api['user']}/${username}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

const getMovies = async token => {
  try {
    let moviesList = await axios.get(api['movies'], {
      headers: { Authorization: `Bearer ${token}` }
    });
    let response = await checkStatus(moviesList);
    const { data } = response;
    return data;
  } catch (error) {
    console.log('getMovies', error);
  }
};

const getMovieById = async (movieId, token) => {
  try {
    let movie = await axios.get(`${api['movies']}/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    let response = await checkStatus(movie);
    const { data } = response;
    return data;
  } catch (error) {
    console.log('getMovieById',error);
  }

};

export {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  getMovies,
  deleteUser,
  addToFavorites,
  removeFromFavorites,
  getMovieById
};
