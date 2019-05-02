import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const RegistrationView = props => {
  console.log('RegistrationView', props);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password);
    props.onRegister(username, password);
  };

  return (
    <Form>
      <Form.Row>
        <Col>
          <Form.Control placeholder="First name" />
        </Col>
        <Col>
          <Form.Control placeholder="Last name" />
        </Col>
      </Form.Row>
      <Form.Group controlId="formBasicEmailRegister">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPasswordRegister">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group controlId="formBasicConfirmPasswordRegister">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" />
      </Form.Group>
      <Form.Group controlId="formBasicChecboxRegister">
        <Form.Check type="checkbox" label="Sign me up for weekly newsletter" />
      </Form.Group>
      <Button variant="outline-primary" type="submit" onClick={handleSubmit}>
        Register
      </Button>
    </Form>
  );
};

export { RegistrationView };
