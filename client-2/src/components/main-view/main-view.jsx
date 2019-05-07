import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LoginModal } from '../login-view/login-modal';
import { RegistrationModal } from '../registration-view/registration-modal';
import CardColumns from 'react-bootstrap/CardColumns';
import { movieApi } from '../../helpers/movieAPI';
import { isEmpty } from '../../helpers/isEmpty';
import './main-view.scss';
import { WelcomeView } from '../welcome-view/welcome-view';
import { DirectorView } from '../director-view/director-view';

class MainView extends Component {
  state = {
    user: null,
    movies: [],
    selectedMovie: null,
    modalShow: {
      login: false,
      register: false
    }
  };

  async componentDidMount() {
    try {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getMovies(token) {
    try {
      let getMovies = await axios.get(movieApi['getMovies'], {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { status, data } = getMovies; // returns an array of movies
      console.warn(data);
      if (status === 201) {
        this.setState({
          movies: data
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  onLoggedIn(authData) {
    console.warn('authData', authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegister(username, password) {
    console.warn('onRegister', username, password);
  }

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
    const { movies, user, modalShow } = this.state;

    if (isEmpty(user)) {
      return (
        <div className="main-view">
          <Container>
            <Row>
              <Col>
                <ButtonToolbar>
                  <LoginModal
                    onModalShow={this.onModalShow('login')}
                    modalShow={modalShow.login}
                    onModalClose={this.onModalClose('login')}
                    onLoggedIn={user => this.onLoggedIn(user)}
                  />

                  <RegistrationModal
                    onModalShow={this.onModalShow('register')}
                    modalShow={modalShow.register}
                    onModalClose={this.onModalClose('register')}
                    onRegister={user => this.onRegister(user)}
                  />
                </ButtonToolbar>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }

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
        <div className="main-view">
          <Container>
            <Route exact path="/" render={() => <WelcomeView />} />
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
                if (!movies || !movies.length)
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
            <Row>
              <Col>The footer</Col>
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}

export default MainView;
