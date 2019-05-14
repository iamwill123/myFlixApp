// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// // import Toast from 'react-bootstrap/Toast';
// // import AlertView from '../alert-view/alert-view';

// // https://react-bootstrap.netlify.com/components/toasts/#toasts
// const ToastMessage = ({ showToast, variant, children }) => {
//   // const [show, setShow] = useState(false);

//   // setShow(showToast);

//   // const toggleToast = () => this.setState({ show: !show });

//   return (
//     <div
//       aria-live="polite"
//       aria-atomic="true"
//       style={{
//         position: 'relative',
//         minHeight: '100px'
//       }}
//     >
//       {/* <Toast
//         style={{
//           position: 'absolute',
//           bottom: 0,
//           right: 0
//         }}
//         show={show}
//         onClose={toggleToast}
//         delay={3000}
//         autohide
//       >
//         <Toast.Header>
//           <small>11 mins ago</small>
//           <small>add a JS timestamp</small>
//         </Toast.Header>
//         <Toast.Body>
//           <AlertView variant={variant}>{children}</AlertView>
//         </Toast.Body>
//       </Toast> */}
//     </div>
//   );
// };

// ToastMessage.propTypes = {
//   showToast: PropTypes.bool.isRequired,
//   variant: PropTypes.oneOf([
//     'primary',
//     'secondary',
//     'success',
//     'danger',
//     'warning',
//     'info',
//     'light',
//     'dark'
//   ]).isRequired,
//   children: PropTypes.any.isRequired
// };

// export default ToastMessage;
