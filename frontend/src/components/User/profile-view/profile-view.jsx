import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import './profile-view.scss';
import { unsplashPlaceholder } from '../../../helpers/placeholder';
import { deleteUser } from '../../../helpers/movieAPI';
import { isEmpty } from '../../../helpers/isEmpty';
import { FavoriteMoviesView } from './favorite-movies-view';

class ProfileView extends Component {
  state = {};

  onHandleUserDelete(username) {
    deleteUser(username)
      .then(res => {
        console.log(res);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    if (isEmpty(this.props.user) || isEmpty(this.props.token))
      return 'Loading user profile...';

    const {
      user: { Username, Email, FavoriteMovies }
    } = this.props;

    const favorites = movieId => {
      return (
        <FavoriteMoviesView
          movieId={movieId}
          token={this.props.token}
          key={movieId}
        />
      );
    };

    return (
      <div>
        <Card>
          <Card.Img
            variant="top"
            src={unsplashPlaceholder('1024x300', 'nature')}
          />
          <Card.Body>
            <Card.Title>{Username}</Card.Title>
            <Card.Text>{Email}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Cras justo odio</ListGroupItem>
            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem>
          </ListGroup>
          <Card.Body style={styles.deleteAccountBtnWrapper}>
            <Button
              variant="danger"
              onClick={() => this.onHandleUserDelete(Username)}
            >
              Delete Account
            </Button>
          </Card.Body>
        </Card>
        <hr />
        {!isEmpty(FavoriteMovies) ? (
          <h2> Favorite movies: </h2>
        ) : (
          <h2> Add some favorite movies</h2>
        )}
        <CardColumns>
          {/* search for the movie via id */}
          {!isEmpty(FavoriteMovies) && FavoriteMovies.map(favorites)}
        </CardColumns>
      </div>
    );
  }
}

const styles = {
  deleteAccountBtnWrapper: {
    textAlign: 'right'
  }
};

export default ProfileView;
