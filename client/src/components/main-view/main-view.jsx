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

let apiEndpoint = 'https://my-flix-db-11209.herokuapp.com';

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
      let getMovies = await axios.get(`${apiEndpoint}/movies`);
      const { status, data } = getMovies; // returns an array of movies
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
    console.log(movie);
    this.setState({
      selectedMovie: movie
    });
  };

  onLoggedIn(user) {
    this.setState({
      user
    });
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

    if (movies.length === 0) {
      return <p>Loading...</p>;
    }

    return (
      <div className="main-view">
        <Container>
          <Row>
            <Col>
              {!user ? (
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
              ) : (
                console.log('logged in')
              )}
            </Col>
          </Row>
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
