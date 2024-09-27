import { configureStore } from "@reduxjs/toolkit";
import {
  authSlice,
  groupSlice,
  hisobotSlice,
  loaderSlice,
  monthSlice,
  workerSlice,
  studentSlice,
  kursSlice,
  teacherSlice,
} from "../redux/features";

const store = configureStore({
  reducer: {
    month: monthSlice,
    auth: authSlice,
    group: groupSlice,
    hisobot: hisobotSlice,
    loader: loaderSlice,
    worker: workerSlice,
    student: studentSlice,
    kurs: kursSlice,
    teacher: teacherSlice,
  },
});
export default store;
