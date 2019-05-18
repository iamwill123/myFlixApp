import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMovies, setUser, setUsers } from '../../../redux/actions/actions';

import { WelcomeView } from '../welcome-view/welcome-view';
import { DirectorView } from '../../Movie/director-view/director-view';
import { GenreView } from '../../Movie/genre-view/genre-view';
import { MovieView } from '../../Movie/movie-view/movie-view';
import MoviesList from '../../Movie/movies-list/movies-list';
import ProfileView from '../../User/profile-view/profile-view';
import { GlobalNavbar } from '../../GlobalComponents/global-navbar';
import UserList from '../../Users/users-list';
import Footer from '../../GlobalComponents/footer';

import { getUser, getMovies, getUsers } from '../../../helpers/movieAPI';
import { isEmpty } from '../../../helpers/isEmpty';

// import ToastMessage from '../../ReusableComponents/toast-message/toast-message';
import Container from 'react-bootstrap/Container';
import AlertView from '../../ReusableComponents/alert-view/alert-view';
import Row from 'react-bootstrap/Row';

import './main-view.scss';

const mapState = ({ movies, user, users }) => ({
  movies,
  user,
  users
});

const actions = { setMovies, setUser, setUsers };

class MainView extends Component {
  state = {
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
        await this.getCurrentUser();
        await this.getMoviesList();
        await this.getUsersList();
      }
    } catch (error) {
      console.log('componentDidMount', error);
    }
  }

  async getCurrentUser() {
    try {
      let username = await localStorage.getItem('username');
      let token = await localStorage.getItem('token');
      let getCurrentUser = await getUser(username, token);
      const { status, data } = getCurrentUser;
      if (status === 201) {
        this.props.setUser(data);
      }
    } catch (error) {
      console.log('getCurrentUser', error);
    }
  }

  async getMoviesList() {
    try {
      let token = await localStorage.getItem('token');
      let getMoviesList = await getMovies(token);
      const { status, data } = getMoviesList;
      if (status === 201) {
        this.props.setMovies(data);
      }
    } catch (error) {
      console.log('getMovies', error);
    }
  }

  async getUsersList() {
    try {
      let token = await localStorage.getItem('token');
      let getUsersList = await getUsers(token);
      const { status, data } = getUsersList;
      if (status === 201) {
        this.props.setUsers(data);
      }
    } catch (error) {
      console.log('getUsers', error);
    }
  }

  onLoggedIn = authData => {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('username', authData.user.Username);
    this.props.setUser(authData.user);
    this.setState(
      {
        toastMessage: {
          type: 'success',
          show: true
        }
      },
      () => {
        this.getMoviesList();
        this.getUsersList();
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

  onRegister = () => {
    setTimeout(this.onModalClose('register'), 0);
    setTimeout(this.onModalShow('login'), 0);
  };

  onLoggedOut = () => {
    // temp logout method
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setTimeout(() => (window.location.href = '/myFlixApp'), 0);
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
    const { modalShow, toastMessage } = this.state;
    const { movies, users, user } = this.props;

    return (
      <Router>
        <Container>
          <GlobalNavbar user={user} onLoggedOut={this.onLoggedOut} />
          <div className="main-view">
            <Route
              exact
              path="/myFlixApp"
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
                  <MoviesList />
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
                    token={localStorage.getItem('token')}
                  />
                );
              }}
            />

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
// connect(mapStateToProps, mapDispatchToProps, mergeProps, options)
export default connect(
  mapState,
  actions
)(MainView);
