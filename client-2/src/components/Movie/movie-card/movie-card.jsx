import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Card border="info">
      <Card.Header as="h5">{movie.Title}</Card.Header>
      <Card.Body>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Card.Text style={{ marginBottom: '5%' }}>
            {movie.Director.Name}
          </Card.Text>
        </Link>
        <Card.Text style={{ marginBottom: '0' }}>{movie.Description}</Card.Text>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Card.Text style={{ marginBottom: '5%' }}>
            <small className="text-muted">#{movie.Genre.Name}</small>
          </Card.Text>
        </Link>
        <Link to={`/movies/${movie._id}`}>
          <Button variant="outline-dark">Read more</Button>
        </Link>
      </Card.Body>
      <Card.Footer>
        {/* <small className="text-muted">Last updated 3 mins ago</small> */}
        <small className="text-muted">Released: {movie.ReleaseYear}</small>
      </Card.Footer>
      {/* <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link href="#first">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header> */}
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired
};
export { MovieCard };
