import axios from 'axios';

let token = localStorage.getItem('token');

const movieApi = {
  login: 'https://my-flix-db-11209.herokuapp.com/login',
  user: 'https://my-flix-db-11209.herokuapp.com/user',
  movies: 'https://my-flix-db-11209.herokuapp.com/movies',
  users: 'https://my-flix-db-11209.herokuapp.com/users'
};

const deleteUser = (username) => {
  axios.delete(`${movieApi['user']}/${username}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export { movieApi, deleteUser };
