import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { RegistrationModal } from '../registration-view/registration-modal';
import { LoginModal } from '../login-view/login-modal';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { isEmpty } from '../../helpers/isEmpty';
import PropTypes from 'prop-types';

const WelcomeView = ({
  user,
  modalShow,
  onModalClose,
  onModalShow,
  onRegister,
  onLoggedIn
}) => {
  return (
    <Jumbotron>
      <h1>Welcome to movie.db</h1>
      <p>
        Mollit irure irure ipsum voluptate. Consectetur pariatur incididunt
        velit consectetur.
      </p>

      {isEmpty(user) ? (
        <ButtonToolbar>
          <LoginModal
            onModalShow={onModalShow('login')}
            modalShow={modalShow.login}
            onModalClose={onModalClose('login')}
            onLoggedIn={user => onLoggedIn(user)}
          />
          <div className="mr-2" />
          <RegistrationModal
            onModalShow={onModalShow('register')}
            modalShow={modalShow.register}
            onModalClose={onModalClose('register')}
            onRegister={user => onRegister(user)}
          />
        </ButtonToolbar>
      ) : (
        <Link to={`/movies`}>
          <Button variant="outline-primary">View Movies</Button>
        </Link>
      )}
    </Jumbotron>
  );
};

WelcomeView.propTypes = {
  user: PropTypes.any,
  modalShow: PropTypes.object.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onModalShow: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired
};

export { WelcomeView };
