import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentMonth: "",
};
const monthSlice = createSlice({
  name: "month",
  initialState,
  reducers: {
    changeMonth: (state, action) => {
      state.currentMonth = action.payload;
    },
  },
});

export const { changeMonth } = monthSlice.actions;
export default monthSlice.reducer;
