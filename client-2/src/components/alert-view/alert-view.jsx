import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

// https://react-bootstrap.netlify.com/components/alerts/
const AlertView = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

AlertView.propTypes = {
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark'
  ]).isRequired,
  children: PropTypes.any.isRequired
};

export default AlertView;
