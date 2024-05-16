import { ToastContainer } from "react-toastify";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import React, { useEffect, useRef, useState } from "react";
import SelectMonth from "../List/Select__Month/SelectMonth";
import SideBar from "../SideBar";
import SignIn from "./SignIn";
import { auth, fetchingStudents, loaded, login } from "@/app/redux/actions";
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
    // dispatch(fetchingStudents());
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken && !ref.current) {
      ref.current = true;
      axios
        .get(`${process.env.NEXT_PUBLIC_URL}/api/refresh`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          if (!response.data.refreshToken) {
            throw new Error("foydalanuvchi avtorizatsiya qilinmagan");
          }
          localStorage.setItem("refreshToken", response.data.refreshToken);
          dispatch(login());

          // localStorage.setItem("token", response.data.accessToken);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (!refreshToken) {
      dispatch(loaded());
    }
    // dispatch(loaded());
  }, []);

  if (store.isAuth) {
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
  }
  if (store.loading === "loading" || store.loading === "none") {
    return <Loader />;
  }
  return <SignIn />;
};

export default Login;
