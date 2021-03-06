import React from 'react';
import Button from 'react-bootstrap/Button';
import { LoginView } from './login-view';
import { ReusableModal } from '../../ReusableComponents/modal/reusable-modal';

const LoginModal = props => {
  // console.log('LoginModal', props);
  return (
    <>
      <Button variant="outline-primary" onClick={props.onModalShow}>
        Login
      </Button>
      <ReusableModal
        show={props.modalShow}
        onHide={props.onModalClose}
        heading="Login"
      >
        <LoginView onLoggedIn={props.onLoggedIn} />
      </ReusableModal>
    </>
  );
};

export { LoginModal };
