import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import { addRoomFn } from "@/app/redux/features/groupSlice";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { spinnerLoading } from "@/app/redux/features/loaderSlice";
import Spinner from "../Students/Spinner";
function AddRoomModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const roomRef = useRef(null);
  const [roomName, setRoomName] = useState("");
  const rooms = useSelector((state) => state.group.rooms);
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  return (
    <>
      <AddHomeWorkIcon
        style={{
          fontSize: "30px",
          cursor: "pointer",
        }}
        className="text-blue-500  "
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yangi sinf xona qo`shish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              type="text"
              placeholder="sinf xona nomi"
              className="p-[10px] bg-white shadow-md outline-none"
              ref={roomRef}
              tabIndex={-1}
              value={roomName}
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          {store.loader.spinnerLoader === "loading" ? (
            <Spinner />
          ) : (
            <Button
              variant="success"
              onClick={() => {
                if (!roomName) {
                  return;
                }
                const findRoom = rooms.findIndex(
                  (el) => el.roomName === roomName
                );
                if (findRoom >= 0) {
                  return toast.error("bunday sinf xona mavjud!");
                }
                const room = {
                  id: v4(),
                  roomName,
                };

                dispatch(spinnerLoading());
                dispatch(addRoomFn(room));
                setRoomName("");
              }}
            >
              Qo`shish
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddRoomModal;
