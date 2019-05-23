import React, { useState } from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import AlertView from '../../ReusableComponents/alert-view/alert-view';
import { updateUser, getUser } from '../../../helpers/movieAPI';
import { setUser } from '../../../redux/actions/actions';
import { localStore } from '../../../helpers/localStorageClient';
import { isEmpty } from '../../../helpers/isEmpty';

const mapState = ({ user }) => {
  return {
    user
  };
};

const actions = { setUser };

const UpdateUserView = props => {
  console.log('UpdateUserView', props);

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(props.user.Username);
  const [email, setEmail] = useState(props.user.Email);
  const [password, setPassword] = useState(props.user.Password);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState(
    props.user.Birthday ? props.user.Birthday.slice(0, -14) : ''
  );
  const [validate, setValidation] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errorValidate, setErrorValidation] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidation(true);
    setLoading(true);

    updateUser(props.user._id, username, email, birthday, password)
      .then(response => {
        console.log('TCL: response', response);
        if (response === 200) {
          setTimeout(() => setLoading(false), 1000);
          setErrorValidation('');
          setError('');
          setSuccess(
            `🎉 Hey ${username}, you updated successfully., please wait a few seconds for the data to update.`
          );
          const { token } = localStore;
          localStore.setTokenAndUsername(token, username);
          let getCurrentUser = getUser(username, token);
          console.log('TCL: getCurrentUser', getCurrentUser);
          debugger;
          getCurrentUser
            .then(response => {
              console.log('TCL: response getCurrentUser', response);
              props.setUser(response);
            })
            .finally(() => setTimeout(() => props.onUpdate(), 5000));
          // setTimeout(() => props.onUpdate(), 5000);
        }
      })
      // .then(username => {
      //   const { token } = localStore;
      //   let getCurrentUser = getUserById(username, token);
      //   props.setUser(getCurrentUser);
      // })
      .catch(error => {
        let errorResponse = error.response.data.errors[0];
        const { msg, param, value } = errorResponse;
        if (errorResponse) {
          setLoading(false);
          setErrorValidation(param);
          setError(`
            ${msg}
            [${param}: ${value}]
          `);
        }
        console.log('Error', errorResponse);
      });
  };
  if (isEmpty(props.user)) return 'Loading';
  return (
    <Form noValidate validated={validate} onSubmit={e => handleSubmit(e)}>
      <Form.Group controlId="formBasicEmailRegister">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          isInvalid={errorValidate === 'Email'}
          style={{ borderColor: errorValidate === 'Email' && '#dc3545' }}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please use an email.
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicUsernameRegister">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          isInvalid={errorValidate === 'Username'}
          style={{ borderColor: errorValidate === 'Username' && '#dc3545' }}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please choose a username.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicBirthdayRegister">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPasswordRegister">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a password.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicConfirmPasswordRegister">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please confirm password.
        </Form.Control.Feedback>
        {password !== confirmPassword && (
          <AlertView variant="warning">
            Confirm password and password do not match.
          </AlertView>
        )}
      </Form.Group>

      <Button
        variant={
          !username || !email || !password
            ? 'outline-secondary'
            : 'outline-primary'
        }
        type="submit"
        disabled={
          !username ||
          !email ||
          !password.includes(confirmPassword) ||
          password !== confirmPassword ||
          success ||
          loading
        }
      >
        {loading
          ? (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) && 'Hold please ...'
          : 'Update'}
      </Button>
      {error && <AlertView variant="danger">{error}</AlertView>}
      {success && <AlertView variant="success">{success}</AlertView>}
    </Form>
  );
};

export default connect(
  mapState,
  actions
)(UpdateUserView);
