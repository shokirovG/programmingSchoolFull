import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditRoomModal({ show, handleClose, room }) {
  const [roomName, setRoomName] = useState(room.roomName);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sinf Xonani tahrirlash</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              type="text"
              value={roomName}
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
              className="p-[10px] bg-white shadow-md outline-none"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className="absolute left-[10px]">
            Sinf Xonani o`chirish
          </Button>
          <Button variant="primary">Saqlash</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditRoomModal;
