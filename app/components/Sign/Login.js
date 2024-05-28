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
  auth,
  fetchingStudents,
  loaded,
  login,
  loginSpinnerLoaded,
  loginSpinnerLoading,
  logOut,
  setAuthLoading,
  setUser,
} from "@/app/redux/actions";
import Loader from "../Loader/Loader";
import useFetch from "@/app/hooks/useFetch";
import { redirect, useRouter } from "@/node_modules/next/navigation";
import axios from "axios";
const Login = ({ children }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useFetch();
  const router = useRouter();
  const ref = useRef(false);
  useEffect(() => {
    dispatch(setAuthLoading(true));
    if (localStorage.getItem("token") && !ref.current) {
      ref.current = true;
      // dispatch(setAuthLoading(true));
      dispatch(loginSpinnerLoading());
      axios
        .get(`${process.env.NEXT_PUBLIC_URL}/api/refresh`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          if (res.data.accessToken) {
            localStorage.setItem("token", res.data.accessToken);
            dispatch(login());
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

  if (store.authLoading) {
    return <Loader />;
  }
  if (!store.isAuth) {
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
