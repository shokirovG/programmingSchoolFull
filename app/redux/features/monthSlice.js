import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentMonth: "",
  monthPrice: {},
};
const monthSlice = createSlice({
  name: "month",
  initialState,
  reducers: {
    changeMonthAction: (state, action) => {
      state.currentMonth = action.payload;
    },
    monthPriceFetched: (state, action) => {
      state.monthPrice = action.payload;
    },
  },
});

export const { changeMonthAction, monthPriceFetched } = monthSlice.actions;
export default monthSlice.reducer;
