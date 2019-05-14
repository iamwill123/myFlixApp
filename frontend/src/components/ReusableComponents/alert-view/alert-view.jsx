import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

// https://react-bootstrap.netlify.com/components/alerts/
const AlertView = ({ position, variant, children }) => {
  // useEffect(() => {
  //   if (autohide && show) {
  //     const timer = setTimeout(() => {
  //       onClose();
  //     }, delay);
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  //   return () => null;
  // }, [autohide, show]);
  if (position === 'absolute') {
    return (
      <Alert
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0
        }}
        variant={variant}
      >
        {children}
      </Alert>
    );
  }
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
