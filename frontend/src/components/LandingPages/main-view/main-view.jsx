import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMovies, setUser, setUsers } from '../../../redux/actions/actions';

import WelcomeView from '../welcome-view/welcome-view';
import DirectorView from '../../Movie/director-view/director-view';
import GenreView from '../../Movie/genre-view/genre-view';
import MovieView from '../../Movie/movie-view/movie-view';
import MoviesList from '../../Movie/movies-list/movies-list';
import ProfileView from '../../User/profile-view/profile-view';
import UserList from '../../Users/users-list';

import { getUser, getMovies, getUsers } from '../../../helpers/movieAPI';

// import ToastMessage from '../../ReusableComponents/toast-message/toast-message';
import AlertView from '../../ReusableComponents/alert-view/alert-view';
import Row from 'react-bootstrap/Row';

import './main-view.scss';
import { localStore } from '../../../helpers/localStorageClient';
import PrivateRoute from '../../GlobalComponents/private-route';

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

  // redirectPath = () => {
  //   const locationState = this.props.location.state;
  //   const pathname =
  //     locationState && locationState.from && locationState.from.pathname;
  //   return pathname || '/myFlixApp';
  // };

  render() {
    const { modalShow, toastMessage } = this.state;

    return (
      <div className="main-view">
        <Switch>
          {/* <Redirect to={this.redirectPath()} /> */}
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
          <PrivateRoute path="/movies/:movieId" component={MovieView} exact />
          <PrivateRoute
            path="/directors/:name"
            component={DirectorView}
            exact
          />
          <PrivateRoute exact path="/genres/:name" component={GenreView} />
          <PrivateRoute path="/users" component={UserList} />
          <PrivateRoute path="/profile/:username" component={ProfileView} />

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

            {toastMessage.show && (
              <AlertView position="absolute" variant={toastMessage.type}>
                {toastMessage.type === 'success' && 'Success!'}
              </AlertView>
            )}
          </Row>
        </Switch>
      </div>
    );
  }
}
// connect(mapStateToProps, mapDispatchToProps, mergeProps, options)
export default withRouter(
  connect(
    null,
    actions
  )(MainView)
);
