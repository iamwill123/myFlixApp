import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { movieApi } from '../../helpers/movieAPI';
import { isEmpty } from '../../helpers/isEmpty';
import AlertView from '../alert-view/alert-view';

const LoginView = props => {
  // console.log('LoginView', props);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidation] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidation(true);
    axios
      .post(movieApi['login'], {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        if (e.message.includes('400')) {
          setError('No such Username.');
        }
      });
  };

  return (
    <Form noValidate validated={validate} onSubmit={e => handleSubmit(e)}>
      <Form.Group controlId="formBasicEmailLogin">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a Username.
        </Form.Control.Feedback>
        {!isEmpty(error) && (
          <AlertView variant="danger">This Username does not exist.</AlertView>
        )}
        <Form.Text className="text-muted">
          We'll never share your username/email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPasswordLogin">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please provide your password.
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        variant={
          !username || !password ? 'outline-secondary' : 'outline-primary'
        }
        type="submit"
        disabled={!username || !password}
      >
        Login
      </Button>
    </Form>
  );
};

export { LoginView };
