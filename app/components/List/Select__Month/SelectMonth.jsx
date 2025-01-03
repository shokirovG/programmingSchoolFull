import React, { useEffect, useState } from "react";
import "./month.scss";
import { useSelector, useDispatch } from "react-redux";

import useFetch from "../../../hooks/useFetch";
import { loaded, loading } from "../../../redux/features/loaderSlice";
import { fetchedWorkers } from "../../../redux/features/workerSlice";
import { hisobotFetched } from "../../../redux/features/hisobotSlice";
import { fetchedStudents } from "../../../redux/features/studentSlice";
import { changeMonthAction } from "../../../redux/features/monthSlice";
import { getKurses } from "@/app/redux/features/kursSlice";
function SelectMonth() {
  const date = new Date();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const { request } = useFetch();
  const [monthValue, setMonthValue] = useState(
    localStorage.getItem("currentMonth").split("_")[0]
  );
  const [yearValue, setYearValue] = useState(
    localStorage.getItem("currentMonth").split("_")[1]
  );
  const changeMonth = (e) => {
    const monthYear = `${monthValue}_${yearValue}`;
    console.log("change", `${monthValue}_${yearValue}`);
    dispatch(loading());

    request(`${process.env.NEXT_PUBLIC_URL}/workers`).then((res) => {
      const workers = res.workers.filter((elem) => elem.month === monthYear);

      if (workers.length > 0) {
        dispatch(fetchedWorkers(workers[0].workers));
      } else {
        dispatch(fetchedWorkers([]));
      }
    });
    request(`${process.env.NEXT_PUBLIC_URL}/hisobot`).then((res) => {
      const currentHisobot = res.hisoblar.filter(
        (el) => el.month === localStorage.getItem("currentMonth")
      );
      dispatch(hisobotFetched(currentHisobot));
      dispatch(loaded());
    });

    localStorage.setItem("currentMonth", monthYear);
    dispatch(changeMonthAction(monthYear));
    const options = document.querySelectorAll("#monthOption");

    for (let option of options) {
      if (option.value == localStorage.getItem("currentMonth")) {
        option.setAttribute("selected", true);
        option.classList.add("active__month");
      } else {
        option.removeAttribute("selected");
        option.classList.remove("active__month");
      }
    }
    request(`${process.env.NEXT_PUBLIC_URL}/students`).then((res) => {
      let k = 0;
      for (let elem of res.students) {
        if (elem.month === localStorage.getItem("currentMonth")) {
          k++;

          dispatch(fetchedStudents(elem.students));
          dispatch(loaded());
        }
      }
      if (k === 0) {
        dispatch(fetchedStudents([]));
        dispatch(loaded());
      }
    });
  };
  useEffect(() => {
    const options = document.querySelectorAll("#monthOption");
    dispatch(getKurses({ month: localStorage.getItem("currentMonth") }));
    for (let option of options) {
      if (option.value == localStorage.getItem("currentMonth")) {
        option.setAttribute("selected", true);
        option.classList.add("active__month");
      } else {
        option.removeAttribute("selected");
        option.classList.remove("active__month");
      }
    }
    if (localStorage.getItem("currentMonth") == null) {
      localStorage.setItem(
        "currentMonth",
        `${date.getMonth() + 1}_${date.getFullYear()}`
      );
      dispatch(
        changeMonthAction(`${date.getMonth() + 1}_${date.getFullYear()}`)
      );
    } else {
      dispatch(changeMonthAction(localStorage.getItem("currentMonth")));
    }
  }, []);
  useEffect(() => {
    dispatch(getKurses({ month: localStorage.getItem("currentMonth") }));
  }, [localStorage.getItem("currentMonth")]);
  return (
    <div className="selectdiv absolute w-[500px] ">
      <label className="flex gap-[10px] items-center">
        <select
          onChange={(e) => {
            setMonthValue(e.target.value);
          }}
          value={monthValue}
        >
          <option selected disabled></option>
          <option id="monthOption" value="1" className="active__month">
            Yanvar
          </option>
          <option id="monthOption" value="2">
            Fevral
          </option>
          <option id="monthOption" value="3">
            Mart
          </option>
          <option id="monthOption" value="4">
            Aprel
          </option>
          <option id="monthOption" value="5">
            May
          </option>
          <option id="monthOption" value="6">
            Iyun
          </option>
          <option id="monthOption" value="7">
            Iyul
          </option>
          <option id="monthOption" value="8">
            Avgust
          </option>
          <option id="monthOption" value="9">
            Sentabr
          </option>
          <option id="monthOption" value="10">
            Oktabr
          </option>
          <option id="monthOption" value="11">
            Noyabr
          </option>
          <option id="monthOption" value="12">
            Dekabr
          </option>
        </select>
        <select
          onChange={(e) => {
            setYearValue(e.target.value);
          }}
          value={yearValue}
          className="w-[50px]"
        >
          <option selected disabled></option>
          <option id="monthOption" value="2024">
            2024
          </option>
          <option id="monthOption" value="2025" className="active__month">
            2025
          </option>
          <option id="monthOption" value="2026">
            2026
          </option>
          <option id="monthOption" value="2027">
            2027
          </option>
        </select>

        <button
          onClick={changeMonth}
          className="w-[200px] bg-cyan-500 h-[50px] rounded-md text-white"
        >
          OK
        </button>
      </label>
    </div>
  );
}

export default SelectMonth;
