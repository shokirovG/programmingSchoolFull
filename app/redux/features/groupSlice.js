import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    fetchedGroups: (state, action) => {
      state.groups = action.payload;
    },
  },
});

export const { fetchedGroups } = groupSlice.actions;
export default groupSlice.reducer;
