import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';

import './profile-view.scss';

class ProfileView extends Component {
  state = {};

  render() {
    const { user } = this.props;
    if (!user) return null;
    return (
      <>
        <h1>Profile route</h1>
      </>
    )
  }
}

export default ProfileView;
