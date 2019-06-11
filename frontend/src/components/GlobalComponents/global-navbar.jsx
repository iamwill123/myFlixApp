import React from 'react';
import { connect } from 'react-redux';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { NavLink, withRouter } from 'react-router-dom';
import VisibilityFilterInput from './visibility-filter-input';
import PropTypes from 'prop-types';

import { localStore } from '../../helpers/localStorageClient';
import './global.scss';
// import { isEmpty } from '../../helpers/isEmpty';

const mapState = ({ user }) => ({
  user
});

const GlobalNavbar = ({ user, location }) => {
  const onLoggedOut = () => {
    localStore.removeTokenAndUsername();
    setTimeout(() => (window.location.href = '/myFlixApp'), 0);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="007bff-outline"
      variant="light"
      sticky="top"
    >
      <Navbar.Brand>
        <NavLink to={`/myFlixApp`}>Home</NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {localStore.isLoggedIn() && (
          <>
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to={`/myFlixApp/movies`} exact>
                Movies
              </Nav.Link>
              <Nav.Link as={NavLink} to={`/myFlixApp/users`} exact>
                People
              </Nav.Link>
              <NavDropdown
                title={`👤 ${user.Username ? user.Username : 'Anonymous'}`}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  as={NavLink}
                  to={`/myFlixApp/profile/${user._id}`}
                  exact
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Favorites
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item onClick={onLoggedOut}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {location.pathname === '/movies' && <VisibilityFilterInput />}
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

GlobalNavbar.propTypes = {
  user: PropTypes.any
};

export default withRouter(connect(mapState)(GlobalNavbar));
