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
        Hack up furballs rub butt on table stretch, and lick butt. Go into a
        room to decide you didn't want to be in there anyway put butt in owner's
        face mesmerizing birds. Hiding behind the couch until lured out by a
        feathery toy meowing non stop for food. Scratch the box annoy the old
        grumpy cat, start a fight and then retreat to wash when i lose but nya
        nya nyan but get scared by sudden appearance of cucumber rub face on
        everything, so purr when being pet. Sweet beast. Stare at wall turn and
        meow stare at wall some more meow again continue staring . Sniff other
        cat's butt and hang jaw half open thereafter go into a room to decide
        you didn't want to be in there anyway but meow meow mama. Dream about
        hunting birds meowwww, but stand with legs in litter box, but poop
        outside.
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
