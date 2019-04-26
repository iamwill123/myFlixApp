import React, { Component, useState } from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import { ReusableModal } from '../modal/reusable-modal';

let apiEndpoint = 'https://my-flix-db-11209.herokuapp.com';

class MainView extends Component {
  state = {
    user: null,
    movies: [],
    selectedMovie: null,
    modalShow: false
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

  onModalClose = () => this.setState({ modalShow: false });
  onModalShow = () => this.setState({ modalShow: true });

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
                  <Button variant="primary" onClick={this.onModalShow}>
                    Login
                  </Button>
                  <ReusableModal
                    show={modalShow}
                    onHide={this.onModalClose}
                    heading="Login"
                  >
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </ReusableModal>
                </ButtonToolbar>
              ) : (
                console.log('logged in')
              )}
            </Col>
          </Row>
          <Row>
            <Col>
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
