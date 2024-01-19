import { ToastContainer } from "react-toastify";
import { useSelector } from "@/node_modules/react-redux/dist/react-redux";
import React from "react";
import SelectMonth from "../List/Select__Month/SelectMonth";
import SideBar from "../SideBar";
import SignIn from "./SignIn";

const Login = ({ children }) => {
  const store = useSelector((state) => state);
  return (
    <>
      {store.login == process.env.NEXT_PUBLIC_LOGIN &&
      store.parol == process.env.NEXT_PUBLIC_PAROL ? (
        <>
          <SideBar />
          <div className="children">
            <SelectMonth />
            <ToastContainer />
            {children}
          </div>
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
};

export default Login;
