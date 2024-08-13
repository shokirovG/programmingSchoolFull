import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  students: [],
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    fetchedStudents: (state, action) => {
      state.students = action.payload;
    },
    addStudent: (state, action) => {
      state.students = [...state.students, action.payload];
    },
  },
});

export const { fetchedStudents, addStudent } = studentSlice.actions;
export default studentSlice.reducer;
