import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  teachers: [],
};

export const getTeachers = createAsyncThunk(
  "teacher/getTeachers",
  async (_, { dispatch }) => {
    const teacherData = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/workers`
    );
    const workers = teacherData.data.workers.filter(
      (elem) => elem.month === localStorage.getItem("currentMonth")
    );

    if (workers.length > 0) {
      // dispatch(fetchedWorkers(workers[0].workers));
      const filterTeacher = workers[0].workers.filter(
        (el) => el.department !== "Kafedra"
      );
      dispatch(setTeachers(filterTeacher));
    }
  }
);

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setTeachers: (state = initialState, action) => {
      console.log("action", action);
      state.teachers = action.payload;
    },
  },
});

export const { setTeachers } = teacherSlice.actions;
export default teacherSlice.reducer;
