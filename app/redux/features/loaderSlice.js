import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: "none",
  spinnerLoader: "none",
  spinnerDeleteLoader: "none",
  loginSpinner: "none",
  authLoading: true,
};
const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    loading: (state, action) => {
      state.loading = "loading";
    },
    loaded: (state, action) => {
      state.loading = "loaded";
    },
    spinnerLoading: (state, action) => {
      state.spinnerLoader = "loading";
    },
    spinnerLoaded: (state, action) => {
      state.spinnerLoader = "loaded";
    },
    spinnerDeleteLoading: (state, action) => {
      state.spinnerDeleteLoader = "loading";
    },
    spinnerDeleteLoaded: (state, action) => {
      state.spinnerDeleteLoader = "loaded";
    },
    loginSpinnerLoading: (state, action) => {
      state.loginSpinner = "loading";
    },
    loginSpinnerLoaded: (state, action) => {
      state.loginSpinner = "loaded";
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
  },
});

export const {
  loaded,
  spinnerLoaded,
  spinnerLoading,
  spinnerDeleteLoading,
  spinnerDeleteLoaded,
  loginSpinnerLoading,
  loginSpinnerLoaded,
  setAuthLoading,
  loading,
} = loaderSlice.actions;
export default loaderSlice.reducer;
