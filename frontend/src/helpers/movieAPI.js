import axios from 'axios';

const api = {
  login: 'https://my-flix-db-11209.herokuapp.com/login',
  user: 'https://my-flix-db-11209.herokuapp.com/user',
  movies: 'https://my-flix-db-11209.herokuapp.com/movies',
  users: 'https://my-flix-db-11209.herokuapp.com/users'
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

const getUser = async (username, token) =>
  await axios.get(`${api['user']}/${username}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

const addToFavorites = async (username, movieId) => {
  let token = await localStorage.getItem('token');
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

const getUsers = async token =>
  await axios.get(api['users'], {
    headers: { Authorization: `Bearer ${token}` }
  });

const deleteUser = async (username, token) =>
  await axios.delete(`${api['user']}/${username}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

const getMovies = async token =>
  await axios.get(api['movies'], {
    headers: { Authorization: `Bearer ${token}` }
  });

const getMovieById = async (movieId, token) =>
  await axios.get(`${api['movies']}/${movieId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

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
