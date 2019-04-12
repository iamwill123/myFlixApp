import React, { Component, useState } from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';

let apiEndpoint = 'https://my-flix-db-11209.herokuapp.com';

class MainView extends Component {
  state = {
    user: null,
    movies: [],
    selectedMovie: null
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

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) {
      return <p>Loading...</p>;
    }

    return (
      <div className="main-view">
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
      </div>
    );
  }
}

export default MainView;
