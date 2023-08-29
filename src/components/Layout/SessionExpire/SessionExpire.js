import React from 'react';
import { Modal,Button } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContextProvider';

export const SessionExpire = ({remaining}) => {
    const auth = useAuth();
  return (
    <Modal size='sm' centered={true} show={auth.auth.showSessionMessage} onHide={(e) => e}>
        <Modal.Header closeButton>
        <Modal.Title>Session Expiring!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Your session is about to expire.</p>
            <p>Time remaining : {remaining}</p>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={() => {auth.setAuth({ ...auth.auth, showSessionMessage: false });}}>Stay Logged In</Button>
        </Modal.Footer>
  </Modal>
  )
}
