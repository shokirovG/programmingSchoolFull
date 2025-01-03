import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { spinnerLoaded } from "./loaderSlice";
const initialState = {
  kurses: [],
};
export const getKurses = createAsyncThunk(
  "kurs/getKurses",
  async (payload, { rejectedWidth, dispatch }) => {
    console.log("get curse");
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/allkurses`,
      {
        month: payload.month,
      }
    );

    if (res.data) {
      console.log(res);
      dispatch(fetchedKurses(res.data.kurses));
    } else {
      console.log("kurs topilmadi");
      dispatch(fetchedKurses([]));
    }
  }
);
export const setKurses = createAsyncThunk(
  "kurs/getKurses",
  async (payload, { rejectedWidth, dispatch }) => {
    console.log("get curse");
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/allkurses`,
      {
        month: payload.month,
      }
    );

    if (res.data) {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/setKurses`,
        {
          month: payload.cloneMonth,
          kurses: res.data.kurses,
        }
      );
      console.log("kk", data);
      if (data.data) {
        dispatch(fetchedKurses(res.data.kurses));
      }
    } else {
      console.log("kurs topilmadi");
      dispatch(fetchedKurses([]));
    }
  }
);
export const addKurs = createAsyncThunk(
  "kurs/addKurs",
  async (payload, { rejectedWidthValue, dispatch }) => {
    const { kursName, kursPrice, month } = payload;
    const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/addkurs`, {
      kursName,
      kursPrice,
      month,
    });
    if (res.data) {
      const idKurs = res.data.kurses.filter((el) => el.kurs === kursName);
      dispatch(addKursStore({ kursName, kursPrice, id: idKurs[0]._id }));
      dispatch(spinnerLoaded());
    }
    dispatch(spinnerLoaded());
  }
);
export const removeKurs = createAsyncThunk(
  "kurs/removeKurs",
  async (id, { dispatch }) => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/api/removekurs/${id}`
    );
    dispatch(removeKursAction(id));
    console.log("kurs", res);
  }
);
export const editKurs = createAsyncThunk(
  "kurs/editKurs",
  async (updateKurs, { dispatch }) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/updatekurs`,
      { updateKurs }
    );

    dispatch(updateKursAction(updateKurs));
    dispatch(spinnerLoaded());
    console.log(res);
  }

  //updatekurs
);
const kursSlice = createSlice({
  name: "kurs",
  initialState,
  reducers: {
    fetchedKurses: (state = initialState, action) => {
      state.kurses = action.payload;
    },
    addKursStore: (state = initialState, action) => {
      const { kursName, kursPrice, id } = action.payload;
      state.kurses = [
        ...state.kurses,
        { kurs: kursName, price: +kursPrice, _id: id },
      ];
      console.log("state", state.kurses);
    },
    removeKursAction: (state = initialState, action) => {
      const newKurses = state.kurses.filter(
        (kurs) => kurs._id !== action.payload
      );
      state.kurses = newKurses;
    },
    updateKursAction: (state = initialState, action) => {
      const filterKurses = state.kurses.map((el) => {
        const { kurs, price, _id } = action.payload;
        if (el._id === _id) {
          return {
            ...el,
            kurs,
            price,
          };
        } else {
          return el;
        }
      });
      state.kurses = filterKurses;
    },
  },
});

export const {
  fetchedKurses,
  addKursStore,
  removeKursAction,
  updateKursAction,
} = kursSlice.actions;
export default kursSlice.reducer;
