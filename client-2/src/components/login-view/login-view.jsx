import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { movieApi } from '../../helpers/movieAPI';
console.log(movieApi['login']);
const LoginView = props => {
  // console.log('LoginView', props);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(movieApi['login'], null, {
        params: {
          Username: username,
          Password: password
        }
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log(e, 'no such user');
      });
  };

  return (
    <Form>
      <Form.Group controlId="formBasicEmailLogin">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
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
      </Form.Group>
      <Button variant="outline-primary" type="submit" onClick={handleSubmit}>
        Login
      </Button>
    </Form>
  );
};

export { LoginView };
