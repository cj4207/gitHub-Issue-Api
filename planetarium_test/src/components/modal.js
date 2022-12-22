import { useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';
import './modal.css'
function GlobalModal() {
  const modalRef = useRef()
  const navigate = useNavigate()
  function closeModal(){
    modalRef.current.className = 'modal'
    navigate('/issues')
  }
  return (
    <div
      className="modal"
      style={{ position: 'initial' }}
      ref={modalRef}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={closeModal}>확인</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default GlobalModal;