import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMovies, setUser, setUsers } from '../../../redux/actions/actions';

import WelcomeView from '../welcome-view/welcome-view';
import DirectorView from '../../Movie/director-view/director-view';
import { GenreView } from '../../Movie/genre-view/genre-view';
import MovieView from '../../Movie/movie-view/movie-view';
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
import { localStore } from '../../../helpers/localStorageClient';
import PrivateRoute from '../../GlobalComponents/private-route';

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
      const { token } = localStore;
      if (token !== null) {
        await this.getCurrentUser();
        await this.getMoviesList();
        await this.getUsersList();
      }
    } catch (error) {
      console.log('componentDidMount', error);
    }
  }

  async getCurrentUser() {
    const { token, username } = localStore;
    let getCurrentUser = await getUser(username, token);
    this.props.setUser(getCurrentUser);
  }

  async getMoviesList() {
    const { token } = localStore;
    let getMoviesList = await getMovies(token);
    this.props.setMovies(getMoviesList);
  }

  async getUsersList() {
    const { token } = localStore;
    let getUsersList = await getUsers(token);
    this.props.setUsers(getUsersList);
  }

  onLoggedIn = authData => {
    const {
      token,
      user: { Username }
    } = authData;
    localStore.setTokenAndUsername(token, Username);
    // redux store
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
    localStore.removeTokenAndUsername();
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

  redirectPath = () => {
    console.log(this.props);
    const locationState = this.props.location.state;
    const pathname =
      locationState && locationState.from && locationState.from.pathname;
    return pathname || '/myFlixApp';
  };
  render() {
    const { modalShow, toastMessage } = this.state;
    const { movies, users, user } = this.props;

    return (
      <Container>
        <GlobalNavbar user={user} onLoggedOut={this.onLoggedOut} />
        <div className="main-view">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/myFlixApp" />} />
            <Route
              exact
              path="/myFlixApp"
              render={() => (
                <WelcomeView
                  modalShow={modalShow}
                  onModalClose={this.onModalClose}
                  onModalShow={this.onModalShow}
                  onRegister={this.onRegister}
                  onLoggedIn={this.onLoggedIn}
                />
              )}
            />
            <PrivateRoute path="/movies" component={MoviesList} exact />
            <PrivateRoute path="/movies/:movieId" component={MovieView} />
            <PrivateRoute path="/directors/:name" component={DirectorView} />
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
                        ? user && user
                        : users &&
                          users.find(u => u.Username === match.params.username)
                    }
                    token={localStore.token}
                  />
                );
              }}
            />
            <Redirect to={this.redirectPath()} />
            <Route
              render={({ location }) => (
                <div>
                  <h3>
                    Error! No matches for <code>{location.pathname}</code>
                  </h3>
                </div>
              )}
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
          </Switch>
        </div>
      </Container>
    );
  }
}
// connect(mapStateToProps, mapDispatchToProps, mergeProps, options)
export default withRouter(
  connect(
    mapState,
    actions
  )(MainView)
);
