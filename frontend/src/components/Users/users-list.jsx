import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';

class UserList extends Component {
  state = {};

  render() {
    if (!this.props.users) return 'Loading users...';
    const { users } = this.props;

    const usersList = user => (
      <div key={user._id}>
        <ul>
          <li>{user.Username}</li>
          <li>{user.Email}</li>
        </ul>
      </div>
    );
    return (
      <>
        <h1>Users list route</h1>
        {users.map(usersList)}
      </>
    );
  }
}

export default connect(({ users }) => ({ users }))(UserList);
