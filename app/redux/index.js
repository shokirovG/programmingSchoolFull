import { configureStore } from "@reduxjs/toolkit";
import {
  authSlice,
  groupSlice,
  hisobotSlice,
  loaderSlice,
  monthSlice,
  workerSlice,
  studentSlice,
} from "../redux/features";
import kursSlice from "./features/kursSlice";

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
  },
});
export default store;
