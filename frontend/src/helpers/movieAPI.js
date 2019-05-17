import axios from 'axios';

const api = {
  login: 'https://my-flix-db-11209.herokuapp.com/login',
  user: 'https://my-flix-db-11209.herokuapp.com/user',
  movies: 'https://my-flix-db-11209.herokuapp.com/movies',
  users: 'https://my-flix-db-11209.herokuapp.com/users'
};

const registerUser = (username, password, email, birthday) =>
  axios.post(api['user'], {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday
  });

const loginUser = (username, password) =>
  axios.post(api['login'], {
    Username: username,
    Password: password
  });

const getUser = (username, token) =>
  axios.get(`${api['user']}/${username}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

const getUsers = token =>
  axios.get(api['users'], {
    headers: { Authorization: `Bearer ${token}` }
  });

const deleteUser = (username, token) =>
  axios.delete(`${api['user']}/${username}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

const getMovies = token =>
  axios.get(api['movies'], {
    headers: { Authorization: `Bearer ${token}` }
  });

export { registerUser, loginUser, getUser, getUsers, getMovies, deleteUser };
