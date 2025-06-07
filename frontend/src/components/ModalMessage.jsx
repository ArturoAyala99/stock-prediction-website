import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalMessage = (props) => {
  return (
    <>

      <Modal show={props.modal} onHide={props.onClose}>
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{props.message}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalMessage
