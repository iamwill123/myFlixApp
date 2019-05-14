import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardColumns from 'react-bootstrap/CardColumns';

import { WelcomeView } from '../welcome-view/welcome-view';
import { DirectorView } from '../../Movie/director-view/director-view';
import { GenreView } from '../../Movie/genre-view/genre-view';
import { MovieView } from '../../Movie/movie-view/movie-view';
import { MovieCard } from '../../Movie/movie-card/movie-card';
import ProfileView from '../../User/profile-view/profile-view';

import { movieApi } from '../../../helpers/movieAPI';
import { isEmpty } from '../../../helpers/isEmpty';

import './main-view.scss';
import UserList from '../../Users/users-list';
import { GlobalNavbar } from '../../GlobalComponents/global-navbar';
import Footer from '../../GlobalComponents/footer';
// import ToastMessage from '../../ReusableComponents/toast-message/toast-message';
import AlertView from '../../ReusableComponents/alert-view/alert-view';

class MainView extends Component {
  state = {
    user: null,
    users: null,
    movies: [],
    selectedMovie: null,
    modalShow: {
      login: false,
      register: false
    },
    toastMessage: {
      type: '',
      show: false
    }
  };

  async componentDidMount() {
    try {
      let accessToken = await localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState(
          {
            user: localStorage.getItem('user')
          },
          () => {
            this.getMovies(accessToken);
            this.getUsers(accessToken);
          }
        );
      }
    } catch (error) {
      console.log('componentDidMount', error);
    }
  }

  async getMovies(token) {
    try {
      let getMovies = await axios.get(movieApi['getMovies'], {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { status, data } = getMovies; // returns an array of movies
      // console.warn(data);
      if (status === 201) {
        this.setState({
          movies: data
        });
      }
    } catch (error) {
      console.log('getMovies', error);
    }
  }

  async getUsers(token) {
    try {
      let getUsers = await axios.get(movieApi['getUsers'], {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { status, data } = getUsers;
      if (status === 201) {
        console.log(data);
        this.setState({
          users: data
        });
      }
    } catch (error) {
      console.log('getUsers', error);
    }
  }

  onLoggedIn = authData => {
    // console.warn('authData', authData);
    this.setState(
      {
        user: authData.user.Username,
        toastMessage: {
          type: 'success',
          show: true
        }
      },
      () => {
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
        setTimeout(
          () =>
            this.setState({
              toastMessage: {
                show: false
              }
            }),
          3000
        );
      }
    );
  };

  onRegister = username => {
    // console.warn('onRegister', username);
    setTimeout(this.onModalClose('register'), 0);
    setTimeout(this.onModalShow('login'), 0);
  };

  onLoggedOut = () => {
    // temp logout method
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setTimeout(() => (window.location.href = '/'), 0);
  };

  onModalClose = component => () => {
    component === 'login' && this.setState({ modalShow: { login: false } });
    component === 'register' &&
      this.setState({ modalShow: { register: false } });
  };
  onModalShow = component => () => {
    component === 'login' && this.setState({ modalShow: { login: true } });
    component === 'register' &&
      this.setState({ modalShow: { register: true } });
  };

  render() {
    const { movies, user, modalShow, users, toastMessage } = this.state;
    console.log(users);
    let movieCards = (
      <Row>
        <Col>
          <CardColumns>
            {movies.map(movie => {
              return <MovieCard movie={movie} key={movie._id} />;
            })}
          </CardColumns>
        </Col>
      </Row>
    );

    return (
      <Router>
        <Container>
          <GlobalNavbar user={user} onLoggedOut={this.onLoggedOut} />
          <div className="main-view">
            <Route
              exact
              path="/"
              render={() => (
                <WelcomeView
                  user={user}
                  modalShow={modalShow}
                  onModalClose={this.onModalClose}
                  onModalShow={this.onModalShow}
                  onRegister={this.onRegister}
                  onLoggedIn={this.onLoggedIn}
                />
              )}
            />

            <Route
              exact
              path="/movies"
              render={() =>
                isEmpty(movies) ? (
                  <div className="loading-view">
                    <p>Loading movies...</p>
                  </div>
                ) : (
                  movieCards
                )
              }
            />

            <Route
              path="/movies/:movieId"
              render={({ match }) =>
                isEmpty(movies) ? (
                  <div className="loading-view">
                    <p>Loading the movie...</p>
                  </div>
                ) : (
                  <MovieView
                    movie={movies.find(m => m._id === match.params.movieId)}
                  />
                )
              }
            />
            <Route
              path="/directors/:name"
              render={({ match }) => {
                if (isEmpty(movies))
                  return (
                    <div className="loading-view">
                      <p>Loading the director...</p>
                    </div>
                  );
                return (
                  <DirectorView
                    movie={movies.find(
                      m => m.Director.Name === match.params.name
                    )}
                  />
                );
              }}
            />
            <Route
              exact
              path="/genres/:name"
              render={({ match }) => {
                if (isEmpty(movies))
                  return (
                    <div className="loading-view">
                      <p>Loading the genres...</p>
                    </div>
                  );
                return (
                  <GenreView
                    movie={movies.find(m => m.Genre.Name === match.params.name)}
                  />
                );
              }}
            />

            <Route
              path="/users"
              render={() => {
                if (isEmpty(users))
                  return (
                    <div className="loading-view">
                      <p>You must be logged in to view users list.</p>
                    </div>
                  );
                return <UserList users={users} />;
              }}
            />

            <Route
              path="/profile/:username"
              render={({ match }) => {
                if (isEmpty(user))
                  return (
                    <div className="loading-view">
                      <p>Login to view your profile.</p>
                    </div>
                  );
                return (
                  <ProfileView
                    user={
                      user === match.params.username
                        ? user
                        : users &&
                          users.find(u => u.Username === match.params.username)
                    }
                  />
                );
              }}
            />
            {/* For profile of other users issue with find method */}
            {/* <Route
              path="/profile/:username"
              render={({ match }) => {
                if (isEmpty(user))
                  return (
                    <div className="loading-view">
                      <p>Login to view your profile.</p>
                    </div>
                  );
                return (
                  <ProfileView
                    user={users.find(u => u.Username === match.params.username)}
                  />
                );
              }}
            /> */}
            <Row>
              {/* toast coming in next release */}
              {/* {toastMessage.show && (
                <ToastMessage
                  showToast={toastMessage.show}
                  variant={toastMessage.type}
                >
                  {toastMessage.type === 'success' && 'Success!'}
                  {toastMessage.type === 'danger' && 'Something went wrong.'}
                </ToastMessage>
              )} */}
              <Footer />
              {toastMessage.show && (
                <AlertView position="absolute" variant={toastMessage.type}>
                  {toastMessage.type === 'success' && 'Success!'}
                </AlertView>
              )}
            </Row>
          </div>
        </Container>
      </Router>
    );
  }
}

export default MainView;
