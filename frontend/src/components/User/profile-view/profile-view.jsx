import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
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
import { localStore } from '../../../helpers/localStorageClient';
import { UpdateUserModal } from '../update-user-view.js/update-user-modal';

const mapState = ({ user, users }) => {
  const token = localStore.token;
  return {
    user,
    users,
    token
  };
};
class ProfileView extends Component {
  state = {
    modalShow: {
      updateProfile: false
    }
  };

  onModalClose = component => () => {
    component === 'updateProfile' &&
      this.setState({ modalShow: { updateProfile: false } });
  };

  onModalShow = component => () => {
    component === 'updateProfile' &&
      this.setState({ modalShow: { updateProfile: true } });
  };

  onUpdate = () => {
    setTimeout(this.onModalClose('updateProfile'), 0);
  };

  onHandleUserDelete(username) {
    deleteUser(username)
      .then(res => {
        console.log(res);
        localStore.removeTokenAndUsername();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    if (
      isEmpty(this.props.user) ||
      this.props.user === null ||
      isEmpty(this.props.token) ||
      isEmpty(this.props.users)
    )
      return 'Loading user profile...';

    const { user, users, token, match } = this.props;

    const currentUser =
      user._id === match.params.id
        ? user
        : users.find(u => u._id === match.params.id);

    const { Username, Email, FavoriteMovies } = currentUser;

    const favorites = movieId => {
      return (
        <FavoriteMoviesView movieId={movieId} token={token} key={movieId} />
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
          <Card.Body style={styles.updateAccountBtnWrapper}>
            <UpdateUserModal
              onModalShow={this.onModalShow('updateProfile')}
              modalShow={this.state.modalShow.updateProfile}
              onModalClose={this.onModalClose('updateProfile')}
              onUpdate={this.onUpdate}
            />
          </Card.Body>
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
  updateAccountBtnWrapper: {
    textAlign: 'left'
  },
  deleteAccountBtnWrapper: {
    textAlign: 'right'
  }
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  users: PropTypes.array,
  token: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default connect(mapState)(ProfileView);
