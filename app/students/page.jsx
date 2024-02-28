"use client";
import Image from "@/node_modules/next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./students.scss";
import React, { useEffect, useState, useRef } from "react";
import useFetch from "../hooks/useFetch";
import { v4 } from "uuid";
import numberTrim from "../hooks/number";
import { calcPrice } from "../hooks/calcPrice";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import moment from "moment";
import StudentChangeModal from "../components/Students/StudentChangeModal";
import Loader from "../components/Loader/Loader";
import Spinner from "../components/Students/Spinner";
import StudentsItem from "../components/Students/StudentsItem";
import {
  fetchedStudents,
  fetchingStudents,
  addStudent,
  loaded,
  spinnerLoading,
  spinnerLoaded,
} from "../redux/actions";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Zero from "../hooks/zero";

/* eslint-disable */
const page = ({ params }) => {
  const [group, setGroup] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [validText, setValidText] = useState(false);
  const [foiz, setFoiz] = useState(0);
  const [students, setStudents] = useState([]);
  const { request } = useFetch();

  console.log(params);
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const currentMonth = store.currentMonth;
  const [filterStudents, setFilterStudents] = useState([]);
  const [filterGroup, setFilterGroup] = useState("Barcha guruhlar");
  const date = new Date();
  const initialDate = `${date.getFullYear()}-${Zero(
    date.getMonth() + 1
  )}-${Zero(date.getDate())}`;
  const [createdStudentDate, setCreatedStudentDate] = useState(initialDate);
  const initial = useRef(false);
  const [filterDepartment, setFilterDepartment] = useState("Barcha kafedralar");
  const groupsStore = [
    {
      department: "Dasturlash",
      groups: [
        "Front-5",
        "Front-8",
        "Front-10",
        "Front-12",
        "Front-13",
        "Front-14",
      ],
    },
    {
      department: "K.S",
      groups: [
        "K.S-1",
        "K.S-2",
        "K.S-3",
        "K.S-4",
        "K.S-5",
        "K.S-6",
        "Tibbiyot-1",
        "Tibbiyot-2",
        "Tibbiyot-3",
      ],
    },
    {
      department: "Scretch",
      groups: ["Scretch-1", "Scretch-2"],
    },
    {
      department: "Ingliz-tili",
      groups: ["Ingliz-tili-1", "Ingliz-tili-2"],
    },
    {
      department: "Markaz",
      groups: ["Markaz-1"],
    },
  ];
  const [filterGroupsStore, setFilterGroupsStore] = useState(groupsStore);
  const addStudentForm = (e) => {
    e.preventDefault();
    dispatch(spinnerLoading());
    console.log("form mount");
    // dispatch(fetchingStudents());
    if (group !== "" && department !== "") {
      const newStudent = {
        group,
        department,
        name,
        price: 0,
        id: v4(),
        foiz,
        created: moment(createdStudentDate).format("L"),
      };
      console.log([...store.students, newStudent]);
      request(
        `${process.env.NEXT_PUBLIC_URL}/add`,
        "POST",
        JSON.stringify({
          month: localStorage.getItem("currentMonth"),
          students: [...store.students, newStudent],
        })
      )
        .then((res) => console.log(res))
        .then(() => {
          setName("");
          setFoiz(0);
          toast.success("asdsad");
          console.log("yangi o'quvchi api ga ketdi");
          dispatch(addStudent(newStudent));
          dispatch(spinnerLoaded());
        });
    } else {
      dispatch(spinnerLoaded());
      setValidText(true);
    }
  };

  console.log(filterGroupsStore);
  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      console.log("student mount");

      dispatch(fetchingStudents());
      request(`${process.env.NEXT_PUBLIC_URL}/students`).then((res) => {
        res.students.forEach((elem) => {
          if (elem.month == localStorage.getItem("currentMonth")) {
            console.log("dispatch ishladi", elem.students);
            dispatch(fetchedStudents(elem.students));
            setFilterStudents(elem.students);
          }
        });
        dispatch(loaded());
      });
    }
  }, []);

  useEffect(() => {
    const newStudents = store.students.filter((el) => el.group === filterGroup);
    const a = filterGroup !== "Barcha guruhlar" ? newStudents : store.students;
    setFilterStudents(
      filterGroup !== "Barcha guruhlar" ? newStudents : store.students
    );

    // function counter(id, start, end, duration) {
    //   let obj = document.getElementById(id),
    //     current = start,
    //     range = end - start,
    //     increment = end > start ? 1 : -1,
    //     step = Math.abs(Math.floor(duration / range)),
    //     timer = obj
    //       ? setInterval(() => {
    //           current += increment;
    //           obj.textContent = current;
    //           if (current == end) {
    //             clearInterval(timer);
    //           }
    //         }, step)
    //       : 0;
    // }
    // counter("count1", 0, a.length, 500);
  }, [store]);
  // document.addEventListener("DOMContentLoaded", () => {});

  return (
    <>
      {store.loading === "loading" ? (
        <Loader />
      ) : (
        <div>
          <ToastContainer />
          <Image
            src="/addStudent.png"
            alt="212"
            width="40"
            height="40"
            className="hover:cursor-pointer mx-[20px] my-[20px]"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalAddStudent"
          />
          {store.students.length === 0 ? (
            <h2 className="emptyH2">O'quvchilar topilmadi!</h2>
          ) : (
            <>
              <h4 className="absolute top-[20px] rounded-[5px] text-gray-700 left-[100px] bg-blue-200 p-[7px]">
                O`quvchilar soni{" "}
                <span id="count1">{filterStudents.length} </span>
              </h4>
              <select
                className="absolute left-[30%] top-[20px] bg-white p-[10px]"
                onChange={(e) => {
                  setFilterDepartment(e.target.value);
                  setFilterGroup("Barcha guruhlar");
                  const newGroups =
                    e.target.value === "Barcha kafedralar"
                      ? groupsStore
                      : groupsStore.filter(
                          (elem) => elem.department === e.target.value
                        );
                  setFilterGroupsStore(newGroups);
                  let newStudents = [];
                  newGroups.forEach((elem) => {
                    newStudents = [
                      ...newStudents,
                      store.students.filter((el) => el.group === elem),
                    ];
                  });

                  let newStudents2 = [];

                  for (let item of newGroups[0].groups) {
                    newStudents2 = [
                      ...newStudents2,
                      ...store.students.filter((el) => el.group === item),
                    ];
                  }
                  if (e.target.value === "Barcha kafedralar") {
                    setFilterStudents(store.students);
                  } else {
                    setFilterStudents(newStudents2);
                  }
                }}
              >
                <option selected value="Barcha kafedralar">
                  Barcha Kafedralar
                </option>
                <option value="Dasturlash">Dasturlash</option>
                <option value="K.S">K.S</option>

                <option value="Scretch">Scretch</option>
                <option value="Ingliz-tili">Ingliz-tili</option>
              </select>
              <select
                className="absolute left-[45%] top-[20px] bg-white p-[10px]"
                value={filterGroup}
                onChange={(e) => {
                  setFilterGroup(e.target.value);
                  const newStudents = store.students.filter(
                    (el) => el.group === e.target.value
                  );
                  let newStudents2 = [];
                  console.log("filterGroupsStore", filterGroupsStore);
                  for (let item of filterGroupsStore[0].groups) {
                    newStudents2 = [
                      ...newStudents2,
                      ...store.students.filter((el) => el.group === item),
                    ];
                    console.log("st0", newStudents2);
                  }

                  console.log("newStudents2", newStudents2);
                  if (
                    e.target.value === "Barcha guruhlar" &&
                    filterDepartment === "Barcha kafedralar"
                  ) {
                    setFilterStudents(store.students);
                  } else {
                    setFilterStudents(
                      e.target.value !== "Barcha guruhlar"
                        ? newStudents
                        : newStudents2
                    );
                  }
                }}
              >
                <option selected value="Barcha guruhlar">
                  Barcha guruhlar
                </option>
                {filterGroupsStore.map((elem) => {
                  return elem.groups.map((item) => {
                    return <option value={item}>{item}</option>;
                  });
                })}
              </select>
              <table striped hover variant="light" className="table__students">
                <thead id="thead__students">
                  <tr className="text-center ">
                    <th className="th_1">№</th>
                    <th className="th_2">F.I.SH</th>
                    <th className="th_3">Guruh</th>
                    <th className="th_4">Kafedra</th>
                    <th className="th_5">Qilgan to'lov</th>
                    <th className="th_6">Qarz</th>
                    <th className="th_7">Chegirma</th>
                    <th className="th_8">Guruhga qo'shilgan</th>
                    <th className="th_9"></th>
                  </tr>
                </thead>
                <tbody>
                  {filterStudents.map((elem, index) => {
                    return (
                      <StudentsItem key={elem.id} {...elem} index={index} />
                    );
                  })}
                </tbody>
              </table>
            </>
          )}

          <div
            class="modal fade"
            id="exampleModalAddStudent"
            tabindex="-1"
            aria-labelledby="exampleModalAddStudent"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalAddStudent">
                    Yangi O`quvchi qo`shish({currentMonth})
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form
                    className="flex flex-col gap-[10px]"
                    onSubmit={addStudentForm}
                  >
                    <select
                      className="form-select"
                      aria-label="Guruh"
                      name="group"
                      onChange={(e) => {
                        setGroup(e.target.value);
                        setValidText(false);
                      }}
                    >
                      <option selected disabled>
                        Guruh
                      </option>
                      <option value="Front-5">Front-5</option>
                      <option value="Front-8">Front-8</option>
                      <option value="Front-10">Front-10</option>
                      <option value="Front-12">Front-12</option>
                      <option value="Front-13">Front-13</option>
                      <option value="Front-14">Front-14</option>
                      <option value="K.S-1">K.S-1</option>
                      <option value="K.S-2">K.S-2</option>
                      <option value="K.S-3">K.S-3</option>
                      <option value="K.S-4">K.S-4</option>
                      <option value="K.S-5">K.S-5</option>
                      <option value="K.S-6">K.S-6</option>
                      <option value="Tibbiyot-1">Tibbiyot-1</option>
                      <option value="Tibbiyot-2">Tibbiyot-2</option>
                      <option value="Tibbiyot-3">Tibbiyot-3</option>
                      <option value="Ingliz-tili-1">Ingliz-tili-1</option>
                      <option value="Ingliz-tili-2">Ingliz-tili-2</option>
                      <option value="Scretch-1">Scretch-1</option>
                      <option value="Scretch-2">Scretch-2</option>
                      <option value="Markaz-1">Markaz-1</option>
                    </select>
                    <select
                      className="form-select"
                      aria-label="oy"
                      name="department"
                      onChange={(e) => {
                        setDepartment(e.target.value);
                        setValidText(false);
                      }}
                    >
                      <option selected disabled>
                        Kafedrasi
                      </option>
                      <option value="Dasturlash">Dasturlash</option>
                      <option value="K.S">K.S</option>
                      <option value="Scretch">Scretch</option>
                      <option value="Ingliz-tili">Ingliz-tili</option>
                      <option value="Markaz">Markaz</option>
                    </select>
                    <input
                      required
                      className="form-control"
                      type="text"
                      placeholder="o'quvchi F.I.SH"
                      aria-label="default input example"
                      name="student"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <input
                      required
                      className="form-control"
                      type="text"
                      placeholder="chegirma "
                      aria-label="default input example"
                      name="sadsad"
                      value={foiz}
                      onChange={(e) => {
                        setFoiz(Number(e.target.value));
                      }}
                    />
                    <input
                      type="date"
                      className="w-[150px] mx-[auto] p-[5px] bg-white text-black border-[1px] border-[black]"
                      value={createdStudentDate}
                      onChange={(e) => {
                        setCreatedStudentDate(e.target.value);
                      }}
                    />
                    {validText ? (
                      <p className="text-red-500 text-center">
                        Guruh va Kafedrani tanlang
                      </p>
                    ) : null}
                    {store.spinnerLoader === "loading" ? (
                      <Spinner />
                    ) : (
                      <button class="btn btn-success" id="addStudentBtn">
                        Qo'shish
                      </button>
                    )}
                  </form>
                </div>
                <div class="modal-footer"></div>
              </div>
            </div>
          </div>

          {/* TAXRIRLASH */}
        </div>
      )}
    </>
  );
};

export default page;
