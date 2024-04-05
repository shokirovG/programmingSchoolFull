import { ToastContainer } from "react-toastify";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import React, { useEffect, useState } from "react";
import SelectMonth from "../List/Select__Month/SelectMonth";
import SideBar from "../SideBar";
import SignIn from "./SignIn";
import { auth, fetchingStudents, loaded } from "@/app/redux/actions";
import Loader from "../Loader/Loader";
import useFetch from "@/app/hooks/useFetch";
import { redirect, useRouter } from "@/node_modules/next/navigation";

const Login = ({ children }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useFetch();
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    // request(`${process.env.NEXT_PUBLIC_URL}/auth`).then((res) => {
    //   if (!res.isAuth) {
    //     router.push("/login");
    //   }
    // });
  });
  return (
    <>
      <>
        <SideBar />
        <div className="children">
          <SelectMonth />
          <ToastContainer />
          {children}
        </div>
      </>
    </>
  );
};

export default Login;
