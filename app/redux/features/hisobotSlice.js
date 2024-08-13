import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  hisobot: [],
  majburiyChiqimlar: [],
};

const hisobotSlice = createSlice({
  name: "hisobot",
  initialState,
  reducers: {
    hisobotFetched: (state, action) => {
      console.log("reducer", action);
      state.hisobot = action.payload;
    },
    addTodo: (state, action) => {
      console.log("income", action);
      state.hisobot = [
        { hisoblar: action.payload.newTodo, month: action.payload.month },
      ];
    },
    fetchedMajburiy: (state, action) => {
      state.majburiyChiqimlar =
        action.payload.length > 0
          ? action.payload
          : [{ month: localStorage.getItem("currentMonth"), chiqimlar: [] }];
    },
  },
});

export const { hisobotFetched, addTodo, fetchedMajburiy } =
  hisobotSlice.actions;
export default hisobotSlice.reducer;
