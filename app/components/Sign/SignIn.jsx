"use client";
import useFetch from "@/app/hooks/useFetch";
import {
  fetchingStudents,
  loaded,
  login,
  loginSpinnerLoaded,
  loginSpinnerLoading,
  signIn,
} from "@/app/redux/actions";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import AuthService from "@/services/AuthService";
import React, { useState } from "react";
import "./sign.scss";
import axios from "axios";
import { LoginSpinner } from "../LoginSpinner";
import store from "@/app/redux/index";
const SignIn = ({ loginBtn }) => {
  const [email, setEmail] = useState("");
  const [parol, setParol] = useState("");
  const [info, setInfo] = useState("");
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const submitForm = async (e) => {
    e.preventDefault();
    dispatch(loginSpinnerLoading());
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/login`,
      {
        email,
        password: parol,
      },
      { withCredentials: true }
    );

    if (response.data.accessToken) {
      setInfo("");
      dispatch(fetchingStudents());
      localStorage.setItem("refreshToken", response.data.accessToken);
      dispatch(login(email, parol));
    } else {
      setInfo(response.data.message);
    }
    dispatch(loginSpinnerLoaded());
  };
  return (
    <div className="loginBody">
      <div class="login">
        <h1>Kirish</h1>
        <form method="post" onSubmit={submitForm}>
          <input
            type="text"
            name="u"
            placeholder="Username"
            required="required"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="p"
            placeholder="Password"
            required="required"
            value={parol}
            onChange={(e) => setParol(e.target.value)}
          />
          <p className="text-red-500 capitalize">{info}</p>
          <button
            type="submit"
            class="btn btn-primary btn-block btn-large btnLogin"
          >
            {store.loginSpinner === "loading" ? (
              <LoginSpinner />
            ) : (
              <span>Kirish</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
