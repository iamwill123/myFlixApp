import React from 'react';
import Button from 'react-bootstrap/Button';
import { ReusableModal } from '../../ReusableComponents/modal/reusable-modal';
import UpdateUserView from './update-user-view';

const UpdateUserModal = props => {
  return (
    <>
      <Button variant="outline-dark" onClick={props.onModalShow}>
        Update Profile
      </Button>
      <ReusableModal
        show={props.modalShow}
        onHide={props.onModalClose}
        heading="Update Profile"
      >
        <UpdateUserView onUpdate={props.onUpdate} onHide={props.onModalClose} />
      </ReusableModal>
    </>
  );
};

export { UpdateUserModal };
