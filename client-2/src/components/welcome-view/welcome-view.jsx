import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const WelcomeView = () => {
  return (
    <Jumbotron>
      <h1>Welcome to movie.db</h1>
      <p>
        Mollit irure irure ipsum voluptate. Consectetur pariatur incididunt
        velit consectetur.
      </p>
      <p>
        <Link to={`/movies`}>
          <Button variant="outline-primary">View Movies</Button>
        </Link>
      </p>
    </Jumbotron>
  );
};

export { WelcomeView };
