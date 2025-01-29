"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { calcPrice } from "@/app/hooks/calcPrice";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";

import Spinner from "../../../Students/Spinner";
import useFetch from "@/app/hooks/useFetch";
import numberTrim from "@/app/hooks/number";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import calcNaqdKirim from "@/app/hooks/calcNaqdKirim";
import calcNaqdChiqim from "@/app/hooks/calcNaqdChiqim";
import calcClickKirim from "@/app/hooks/calcClickKirim";
import calcClickChiqim from "@/app/hooks/calcClickChiqim";
import {
  loaded,
  spinnerLoaded,
  spinnerLoading,
} from "@/app/redux/features/loaderSlice";
import { hisobotFetched } from "@/app/redux/features/hisobotSlice";
import { fetchedStudents } from "@/app/redux/features/studentSlice";
import axios from "axios";
const Kirim = (props) => {
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];
  const store = useSelector((state) => state);

  const [groupValue, setGroupValue] = useState("Guruh");
  const [studentValue, setStudentValue] = useState("O`quvchi");
  const [foizValue, setFoizValue] = useState(0);
  const [tolovTypeValue, setTolovTypeValue] = useState("Naqd");
  const [oyValue, setOyValue] = useState(
    months[
      store.month.currentMonth.slice(0, store.month.currentMonth.length - 5) - 1
    ]
  );
  const [departmentValue, setDepartmentValue] = useState("Kafedra");

  const studentsFilter = store.student.students.filter(
    (el) => el.group === groupValue
  );
  const [eskiTolov, setEskiTolov] = useState(0);
  const dispatch = useDispatch();
  const { request } = useFetch();
  const [currentStudent, setCurrentStudent] = useState([]);
  const [addValid, setAddValid] = useState(false);
  const [tolovValue, setTolovValue] = useState(0);
  const [currentDay, setCurrentDay] = useState("");

  const setDay = () => {
    setCurrentDay(props.kun);
  };
  const addKirim = async () => {
    if (
      departmentValue !== "Kafedra" &&
      groupValue !== "Guruh" &&
      studentValue !== "O`quvchi" &&
      oyValue !== ""
    ) {
      dispatch(spinnerLoading());
      const newKirim = {
        id: v4(),
        department: departmentValue,
        group: groupValue,
        student: studentValue,
        price: +tolovValue,
        priceStudent: Number(tolovValue) + Number(eskiTolov),
        priceType: tolovTypeValue,
        priceMonth: oyValue,
        foiz: foizValue,
      };
      const naqdTolov = tolovTypeValue == "Naqd" ? Number(tolovValue) : 0;
      const clickTolov = tolovTypeValue == "Click" ? Number(tolovValue) : 0;
      const newHisoblar = store.hisobot.hisobot[0].hisoblar.map((elem) => {
        if (elem.kun == localStorage.getItem("currentDay")) {
          return {
            ...elem,
            hisobot: {
              ...elem.hisobot,
              kirim: [...elem.hisobot.kirim, newKirim],
            },
            balansNaqd: Number(
              calcNaqdKirim(elem.hisobot.kirim, "Naqd") -
                calcNaqdChiqim(elem.hisobot.chiqim, "Naqd") +
                naqdTolov
            ),
            balansClick: Number(
              calcClickKirim(elem.hisobot.kirim, "Click") -
                calcClickChiqim(elem.hisobot.chiqim, "Click") +
                clickTolov
            ),
          };
        } else {
          return elem;
        }
      });
      // const newStudents = store.student.students.map((el) => {
      //   if (el.name === studentValue) {
      //     return {
      //       ...el,
      //       price: Number(el.price) + Number(tolovValue),
      //     };
      //   } else {
      //     return el;
      //   }
      // });
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_URL}/hisobot`,

          {
            month: localStorage.getItem("currentMonth"),
            hisoblar: newHisoblar,
          }
        )
        .then(async () => {
          dispatch(
            hisobotFetched([
              {
                hisoblar: newHisoblar,
                month: localStorage.getItem("currentMonth"),
              },
            ])
          );
          dispatch(loaded());
          // axios.get(`${process.env.NEXT_PUBLIC_URL}/students`).then((res) => {
          //   res.data.students.forEach((elem) => {
          //     if (elem.month == localStorage.getItem("currentMonth")) {
          //       dispatch(fetchedStudents(elem.students));
          //       dispatch(loaded());
          //     }
          //   });
          //   dispatch(loaded());
          // });

          await axios
            .post(
              `${process.env.NEXT_PUBLIC_URL}/api/studentprice`,

              {
                month: localStorage.getItem("currentMonth"),
                tolovValue,
                studentValue,

                students: store.student.students,
              }
            )
            .then((res) => {
              dispatch(fetchedStudents(res.data.data.students));
              toast.info("student to`lov o`zgardi!");
            });
          toast.success("bazaga qo`shildi!");
          dispatch(spinnerLoaded());
          setAddValid(false);
          setDepartmentValue("Kafedra");
          setGroupValue("Guruh");
          setStudentValue("O`quvchi");
          setTolovValue(0);
          setTolovTypeValue("Naqd");

          setEskiTolov(0);
        });
    } else {
      setAddValid(true);
    }
  };

  return (
    <div>
      <button
        title="kirim"
        type="button"
        className="btn "
        onClick={() => {
          localStorage.setItem("currentDay", props.kun);
        }}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <Image src="/add.png" alt="#" width="20" height="20" />
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Yangi kirim
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="flex flex-col gap-[10px]">
                <select
                  className="form-select"
                  aria-label="department"
                  value={departmentValue}
                  onChange={(e) => {
                    setDepartmentValue(e.target.value);
                  }}
                >
                  <option selected>Kafedra</option>
                  {store.kurs.kurses.map((kurs) => (
                    <option value={kurs.kurs}>{kurs.kurs}</option>
                  ))}
                </select>
                <select
                  className="form-select"
                  aria-label="Guruh"
                  value={groupValue}
                  onChange={(e) => {
                    setStudentValue("O`quvchi");
                    setEskiTolov(0);
                    setGroupValue(e.target.value);
                  }}
                >
                  <option selected disabled>
                    Guruh
                  </option>
                  {store.group.groups.map((elem) =>
                    elem.departmentValue === departmentValue ? (
                      <option value={elem.groupValue}>{elem.groupValue}</option>
                    ) : null
                  )}
                </select>
                <select
                  className="form-select"
                  aria-label="oquvchi"
                  value={studentValue}
                  onChange={(e) => {
                    setStudentValue(e.target.value);
                    const stFilter = studentsFilter.filter(
                      (el) => el.name === e.target.value
                    );

                    setEskiTolov(stFilter[0].price);
                    setFoizValue(stFilter[0].foiz);
                    setCurrentStudent(stFilter[0]);
                  }}
                >
                  <option selected>O`quvchi</option>
                  {studentsFilter.map((elem) => {
                    return (
                      <option value={elem.name} key={elem.id}>
                        {elem.name}
                      </option>
                    );
                  })}
                </select>
                <input
                  className="form-control"
                  type="text"
                  placeholder="to`lov"
                  aria-label="default input example"
                  value={tolovValue}
                  onChange={(e) => {
                    setTolovValue(Number(e.target.value));
                  }}
                />
                <p className="ml-[5px]">
                  Oldindan to`lov:{" "}
                  <span className="text-green-500">
                    {" "}
                    +{numberTrim(eskiTolov)}
                  </span>{" "}
                  so`m <br />
                  Qarzi:{" "}
                  <span className="text-red-500">
                    {numberTrim(
                      calcPrice(
                        tolovValue + eskiTolov,
                        foizValue,
                        departmentValue,
                        store
                      )
                    )}
                  </span>
                  {" so`m"}
                  <br />
                  Kurs narxi:{" "}
                  {numberTrim(calcPrice(0, 0, departmentValue, store))} so`m (
                  {numberTrim(foizValue)} so`m chegirma)
                </p>
                <select
                  className="form-select"
                  aria-label="tolovType"
                  value={tolovTypeValue}
                  onChange={(e) => {
                    setTolovTypeValue(e.target.value);
                  }}
                >
                  <option value="Naqd">Naqd</option>
                  <option value="Click">Click</option>
                </select>
                <select
                  className="form-select"
                  aria-label="oy"
                  onChange={(e) => {
                    setOyValue(e.target.value);
                  }}
                  value={oyValue}
                >
                  <option value="Yanvar">Yanvar</option>
                  <option value="Fevral">Fevral</option>
                  <option value="Mart">Mart</option>
                  <option value="Aprel">Aprel</option>
                  <option value="May">May</option>
                  <option value="Iyun">Iyun</option>
                  <option value="Iyul">Iyul</option>
                  <option value="Avgust">Avgust</option>
                  <option value="Sentabr">Sentabr</option>
                  <option value="Oktabr">Oktabr</option>
                  <option value="Noyabr">Noyabr</option>
                  <option value="Dekabr">Dekabr</option>
                </select>
              </form>
            </div>
            <div className="modal-footer flex gap-[20px]">
              {addValid ? (
                <h6 className="text-red-300">
                  Iltimos barcha ma`lumotarni kiriting!
                </h6>
              ) : null}

              {store.loader.spinnerLoader === "loading" ? (
                <Spinner />
              ) : (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={addKirim}
                >
                  Qo`shish
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kirim;
