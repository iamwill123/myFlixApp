import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Link, NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import { isEmpty } from '../../helpers/isEmpty';

import './global.scss';

const GlobalNavbar = ({ user, onLoggedOut }) => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="007bff-outline"
      variant="light"
      sticky="top"
    >
      <Navbar.Brand>
        <Link to={`/myFlixApp`}>Home</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {!isEmpty(user) && (
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to={`/users`} exact>
              People
            </Nav.Link>
            <NavDropdown title={`👤 ${user}`} id="collasible-nav-dropdown">
              <NavDropdown.Item as={NavLink} to={`/profile/${user}`} exact>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Favorites</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              {!isEmpty(user) && (
                <NavDropdown.Item onClick={onLoggedOut}>
                  Log out
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        )}

        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

GlobalNavbar.propTypes = {
  user: PropTypes.any
};

export { GlobalNavbar };
