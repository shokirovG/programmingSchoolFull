import { getRoomsFn } from "@/app/redux/features/groupSlice";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import React, { useEffect } from "react";
import AddRoomModal from "./AddRoomModal";
import RoomItem from "./RoomItem";
const RoomList = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.group.rooms);
  useEffect(() => {
    dispatch(getRoomsFn());
  }, []);
  return (
    <div className="w-[80%] shadow-md min-h-[100px] mx-auto rounded mt-[30px]">
      <div className="flex flex-col items-center p-[5px] relative pl-[20px]">
        <h5>Sinf Xonalar</h5>

        <div className="flex w-full gap-[100px] items-center">
          <AddRoomModal />
          <div className="flex gap-[10px] flex-wrap">
            {rooms.map((room) => (
              <RoomItem room={room} key={room.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
