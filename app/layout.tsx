"use client";
// eslint-disable-next-line no-use-before-define
//eslint-disable-line
import "./globals.scss";
import SideBar from "@/app/components/SideBar";
import {
  Provider,
  useDispatch,
} from "@/node_modules/react-redux/dist/react-redux";
/* eslint-disable */
import store from "./redux/index";
import SelectMonth from "./components/List/Select__Month/SelectMonth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef } from "react";
import { fetchedStudents, fetchingStudents, loaded } from "./redux/actions";
import useFetch from "./hooks/useFetch";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&family=Ubuntu:wght@500;700&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,700&family=Poppins:wght@500;700&family=Ubuntu:wght@500;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
            crossOrigin="anonymous"
          />
        </head>
        <body className="app flex">
          <SideBar />
          <div className="children">
            <SelectMonth />
            <ToastContainer />
            {children}
          </div>
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
            crossOrigin="anonymous"
          ></script>
        </body>
      </html>
    </Provider>
  );
}
