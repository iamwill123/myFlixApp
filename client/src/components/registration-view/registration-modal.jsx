import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ReusableModal } from '../modal/reusable-modal';
import { RegistrationView } from './registration-view';

const RegistrationModal = props => {
  console.log('RegistrationModal', props);
  return (
    <>
      <Button variant="outline-secondary" onClick={props.onModalShow}>
        Register
      </Button>
      <ReusableModal
        show={props.modalShow}
        onHide={props.onModalClose}
        heading="Registration"
      >
        <RegistrationView onRegister={props.onRegister} />
      </ReusableModal>
    </>
  );
};

export { RegistrationModal };
