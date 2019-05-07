import React, { Component, useState } from 'react';
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

  onMovieSelect = movie => {
    this.setState({
      selectedMovie: movie
    });
  };

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
    const { movies, selectedMovie, user, modalShow } = this.state;

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

    if (isEmpty(movies)) {
      return <p>Loading...</p>;
    }

    return (
      <div className="main-view">
        <Container>
          <Row>
            <Col>
              <CardColumns>
                {selectedMovie ? (
                  <MovieView movie={selectedMovie} />
                ) : (
                  movies.map(movie => {
                    return (
                      <MovieCard
                        movie={movie}
                        key={movie._id}
                        onMovieSelect={movie => this.onMovieSelect(movie)}
                      />
                    );
                  })
                )}
              </CardColumns>
            </Col>
          </Row>
          <Row>
            <Col>The footer</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default MainView;