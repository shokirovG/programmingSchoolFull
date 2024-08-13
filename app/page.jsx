"use client";

import List from "@/app/components/List/List";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Loader from "./components/Loader/Loader";

import { useRouter, useParams } from "next/navigation";
import useFetch from "./hooks/useFetch";
import SignIn from "./components/Sign/SignIn";
import { redirect } from "@/node_modules/next/navigation";
import { loaded, loading } from "./redux/features/loaderSlice";
import { fetchedWorkers } from "./redux/features/workerSlice";
import { fetchedGroups } from "./redux/features/groupSlice";
import { fetchedStudents } from "./redux/features/studentSlice";
import { hisobotFetched } from "./redux/features/hisobotSlice";
import { getKurses } from "./redux/features/kursSlice";
export default function Home() {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useFetch();
  const initial = useRef(false);
  const initial2 = useRef(false);

  useEffect(() => {
    dispatch(loading());
    dispatch(getKurses({ month: localStorage.getItem("currentMonth") }));
    localStorage.setItem("currentPage", "hisobot");
    request(`${process.env.NEXT_PUBLIC_URL}/workers`).then((res) => {
      const workers = res.workers.filter(
        (elem) => elem.month === localStorage.getItem("currentMonth")
      );

      if (workers.length > 0) {
        dispatch(fetchedWorkers(workers[0].workers));
      }
    });

    request(`${process.env.NEXT_PUBLIC_URL}/tables`).then((res) => {
      if (res) {
        if (res) {
          const tables = res.groups.filter(
            (elem) => elem.month === localStorage.getItem("currentMonth")
          );
          if (tables.length !== 0) {
            dispatch(fetchedGroups(tables[0].groups));
          } else {
            dispatch(fetchedGroups([]));
          }
        }
      }
    });
    if (!initial.current) {
      initial.current = true;

      dispatch(loading());

      request(`${process.env.NEXT_PUBLIC_URL}/students`).then((res) => {
        res.students.forEach((elem) => {
          if (elem.month == localStorage.getItem("currentMonth")) {
            dispatch(fetchedStudents(elem.students));
            dispatch(loaded());
          }
        });
      });
    }

    dispatch(loading());
    if (!localStorage.getItem("currentPage")) {
      localStorage.setItem("currentPage", "hisobot");
    }
    request(`${process.env.NEXT_PUBLIC_URL}/hisobot`).then((res) => {
      const currentHisobot = res.hisoblar.filter(
        (el) => el.month == localStorage.getItem("currentMonth")
      );

      dispatch(hisobotFetched(currentHisobot));
      dispatch(loaded());
    });
    // dispatch(loaded());
  }, []);

  if (store.loader.loading === "loading") {
    return <Loader />;
  }

  if (store.auth.user.rol === "admin") {
    localStorage.setItem("currentPage", "students");

    redirect("/students");
  }

  return <List />;
}
