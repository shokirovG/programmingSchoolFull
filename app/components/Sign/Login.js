import { ToastContainer } from "react-toastify";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import React, { useEffect, useRef, useState } from "react";
import SelectMonth from "../List/Select__Month/SelectMonth";
import SideBar from "../SideBar";
import SignIn from "./SignIn";
import {
  loaded,
  loginSpinnerLoaded,
  loginSpinnerLoading,
  setAuthLoading,
} from "@/app/redux/features/loaderSlice";
import {
  getMarkazName,
  login,
  logOut,
  setUser,
} from "@/app/redux/features/authSlice";
import Loader from "../Loader/Loader";
import useFetch from "@/app/hooks/useFetch";
import { redirect, useRouter } from "@/node_modules/next/navigation";
import axios from "axios";
const Login = ({ children }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const date = new Date();
  const ref = useRef(false);
  useEffect(() => {
    dispatch(setAuthLoading(true));
    console.log("dispatch");
    dispatch(getMarkazName());
    if (!localStorage.getItem("currentMonth")) {
      localStorage.setItem(
        "currentMonth",
        `${date.getMonth() + 1}_${date.getFullYear()}`
      );
    }
    if (localStorage.getItem("token") && !ref.current) {
      ref.current = true;
      // dispatch(setAuthLoading(true));
      dispatch(loginSpinnerLoading());
      dispatch(getMarkazName());
      axios
        .get(`${process.env.NEXT_PUBLIC_URL}/api/refresh`, {
          withCredentials: true,
          credentials: "include",
        })
        .then((res) => {
          console.log(res);
          if (res.data.accessToken) {
            localStorage.setItem("token", res.data.accessToken);
            dispatch(login());
            dispatch(loaded());
            dispatch(loginSpinnerLoaded());
            dispatch(setAuthLoading(false));
            dispatch(setUser(res.data.user));
          } else {
            console.log("logout");
            // dispatch(logOut());
            dispatch(setAuthLoading(false));
          }
        })
        .catch((e) => {
          console.log(e);
          localStorage.removeItem("token");
          dispatch(setAuthLoading(false));
          dispatch(logOut());
        })
        .finally(() => {
          dispatch(loginSpinnerLoaded());
        });
    } else if (!localStorage.getItem("token")) {
      dispatch(loaded());
      dispatch(setAuthLoading(false));
    }
  }, []);

  if (store.loader.authLoading) {
    return <Loader />;
  }
  if (!store.auth.isAuth) {
    return <SignIn />;
  }

  return (
    <>
      <SideBar />
      <div className="children">
        <SelectMonth />
        <ToastContainer />
        {children}
      </div>
    </>
  );
};

export default Login;
