import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { spinnerLoaded } from "./loaderSlice";
import axios from "axios";
const initialState = {
  groups: [],
  rooms: [],
};

export const addRoomFn = createAsyncThunk(
  "group/addRoomFn",
  async (room, { dispatch }) => {
    await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/addroom`, room);
    dispatch(addRoom(room));
    dispatch(spinnerLoaded());
    toast.success(room.roomName + " sinf xonasi qo`shildi!");
  }
);
export const getRoomsFn = createAsyncThunk(
  "group/getRoomsFn",
  async (_, { dispatch }) => {
    const roomData = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/getrooms`
    );
    if (roomData.data) {
      dispatch(setRooms(roomData.data));
    }
  }
);
const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    fetchedGroups: (state, action) => {
      state.groups = action.payload;
    },
    addRoom: (state, action) => {
      state.rooms = [...state.rooms, action.payload];
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
  },
});

export const { fetchedGroups, addRoom, setRooms } = groupSlice.actions;
export default groupSlice.reducer;
