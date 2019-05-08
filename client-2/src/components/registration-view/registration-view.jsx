import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { movieApi } from '../../helpers/movieAPI';

const RegistrationView = props => {
  // console.log('RegistrationView', props);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validate, setValidation] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidation(true);
    axios
      .post(movieApi['registerUser'], {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        // window.open('/');
      })
      .catch(e => {
        console.log(e, 'error registering the user');
      });
    props.onRegister(username, password);
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
          <Form.Control.Feedback type="invalid">
            confirm password and password don't match.
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group controlId="formBasicChecboxRegister">
        <Form.Check type="checkbox" label="Sign me up for weekly newsletter" />
      </Form.Group>

      <Button
        variant="outline-primary"
        type="submit"
        disabled={!username || !email || !password ? true : false}
      >
        Register
      </Button>
    </Form>
  );
};

export { RegistrationView };
