import React, { Component } from 'react';
import axios from 'axios';

let apiEndpoint = 'https://my-flix-db-11209.herokuapp.com';
class MainView extends Component {
  state = {
    movies: []
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

  render() {
    const { movies } = this.state;
    console.log(movies);
    return <div className="main-view" />;
  }
}

export default MainView;
