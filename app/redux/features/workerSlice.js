import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  workers: [],
};

const workerSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {
    fetchedWorkers: (state, action) => {
      state.workers = action.payload;
    },
  },
});

export const { fetchedWorkers } = workerSlice.actions;
export default workerSlice.reducer;
