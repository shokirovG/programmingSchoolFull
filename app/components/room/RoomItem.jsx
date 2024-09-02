import { useSelector } from "@/node_modules/react-redux/dist/react-redux";
import React, { useState } from "react";

import EditRoomModal from "./EditRoomModal";
const RoomItem = ({ room }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span
        key={room.id}
        className="bg-slate-200 text-black p-[10px] rounded cursor-pointer hover:bg-slate-300"
        onClick={handleShow}
      >
        {room.roomName}
      </span>
      <EditRoomModal show={show} handleClose={handleClose} room={room} />
    </>
  );
};

export default RoomItem;
