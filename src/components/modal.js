import { useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { modalContentState } from '../state/recoil';
import './modal.css'
function GlobalModal() {
  const modalContent = useRecoilValue(modalContentState)
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
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{modalContent.body}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={closeModal}>확인</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default GlobalModal;