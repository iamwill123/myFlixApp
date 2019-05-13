import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { movieApi } from '../../../helpers/movieAPI';
import AlertView from '../../ReusableComponents/alert-view/alert-view';

const RegistrationView = props => {
  // console.log('RegistrationView', props);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validate, setValidation] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errorValidate, setErrorValidation] = useState('');

  // Why 2 register users?
  // https://cloud.mongodb.com/v2/5b8b61c4c0c6e3634ef54c30#metrics/replicaSet/5c953208fd4cbae9c7c4f9aa/explorer/myFlixDB/users/find
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidation(true);
    axios
      .post(movieApi['user'], {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        if (response.statusText === 'Created') {
          setErrorValidation('');
          setError('');
          const data = response.data;
          setSuccess(
            `🎉 Hey ${
              data.Username
            }, you registered successfully, please login!`
          );
          setTimeout(() => props.onRegister(username), 5000);
        }
      })
      .catch(error => {
        let errorResponse = error.response.data.errors[0];
        const { msg, param, value } = errorResponse;
        if (errorResponse) {
          setErrorValidation(param);
          setError(`
            ${msg}
            [${param}: ${value}]
          `);
        }
        console.log('Error', errorResponse);
      });
    // .finally(() => setTimeout(() => props.onHide(), 5000));
  };

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
      {/* <Form.Group controlId="formBasicChecboxRegister">
        <Form.Check type="checkbox" label="Sign me up for weekly newsletter" />
      </Form.Group> */}

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
          success
        }
      >
        Register
      </Button>
      {error && <AlertView variant="danger">{error}</AlertView>}
      {success && <AlertView variant="success">{success}</AlertView>}
    </Form>
  );
};

export { RegistrationView };
