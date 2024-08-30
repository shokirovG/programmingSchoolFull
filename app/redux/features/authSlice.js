import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  login: "",
  parol: "",
  isAuth: false,
  user: {
    email: "",
    rol: "",
  },
  LCName: "",
  logo: "",
};
export const getMarkazName = createAsyncThunk(
  "auth/getMarkazName",
  async (_, { dispatch }) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/getmarkaz`);
    console.log("res", res.data);
    if (res.data) {
      dispatch(setName(res.data));
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      localStorage.setItem("login", action.payload.log);
      localStorage.setItem("parol", action.payload.pass);
      state.login = action.payload.log;
      state.parol = action.payload.pass;
    },
    logOut: (state, action) => {
      state.isAuth = false;
    },
    auth: (state, action) => {
      state.login = action.payload.login;
      state.parol = action.payload.parol;
    },
    login: (state, action) => {
      state.isAuth = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setName: (state, action) => {
      state.LCName = action.payload.LCName;
      state.logo = action.payload.logo;
    },
  },
});

export const { signIn, logOut, auth, login, setUser, setName } =
  authSlice.actions;
export default authSlice.reducer;
