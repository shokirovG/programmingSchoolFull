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
  fetchedGroups,
} from "../redux/actions";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Zero from "../hooks/zero";
import sortStudentByColor from "../hooks/sortStudentByColor";
/* eslint-disable */
const page = ({ params }) => {
  const [group, setGroup] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [validText, setValidText] = useState(false);
  const [foiz, setFoiz] = useState(0);
  const [students, setStudents] = useState([]);
  const { request } = useFetch();

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
  const [priceStudentDate, setPriceStudentDate] = useState(initialDate);
  const initial = useRef(false);
  const [filterDepartment, setFilterDepartment] = useState("Barcha kafedralar");
  const [classStudent, setClassStudent] = useState(false);

  const [filterGroupsStore, setFilterGroupsStore] = useState([]);
  const [activeBtnColor, setActiveBtnColor] = useState("white");
  const [sortedStudents, setSortedStudents] = useState([]);
  const addStudentForm = (e) => {
    e.preventDefault();
    const findStudent = store.students.findIndex(
      (el) => el.name.trim() == name.trim()
    );
    if (findStudent > 0) {
      setClassStudent(true);
    } else {
      dispatch(spinnerLoading());
      if (group !== "" && department !== "") {
        const newStudent = {
          group,
          department,
          name,
          price: 0,
          id: v4(),
          foiz,
          created: moment(createdStudentDate).format("L"),
          priceDate: moment(priceStudentDate).format("L"),
        };

        request(
          `${process.env.NEXT_PUBLIC_URL}/add`,
          "POST",
          JSON.stringify({
            month: localStorage.getItem("currentMonth"),
            students: [...store.students, newStudent],
          })
        )
          .then((res) => {})
          .then(() => {
            setName("");
            setFoiz(0);
            toast.success("asdsad");

            dispatch(addStudent(newStudent));
            dispatch(spinnerLoaded());
          });
      } else {
        dispatch(spinnerLoaded());
        setValidText(true);
      }
      setClassStudent(false);
    }
  };

  useEffect(() => {
    dispatch(fetchingStudents());
    request(`${process.env.NEXT_PUBLIC_URL}/tables`).then((res) => {
      if (res) {
        if (res) {
          const tables = res.groups.filter(
            (elem) => elem.month === localStorage.getItem("currentMonth")
          );
          if (tables.length !== 0) {
            dispatch(fetchedGroups(tables[0].groups));
            setFilterGroupsStore(tables[0].groups);
          } else {
            dispatch(fetchedGroups([]));
          }
        }
      }
    });

    if (!initial.current) {
      initial.current = true;

      request(`${process.env.NEXT_PUBLIC_URL}/students`).then((res) => {
        res.students.forEach((elem) => {
          if (elem.month == localStorage.getItem("currentMonth")) {
            dispatch(fetchedStudents(elem.students));
            setFilterStudents(elem.students);
            setSortedStudents(
              sortStudentByColor(activeBtnColor, elem.students)
            );
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    const newStudents = store.students.filter((el) => el.group === filterGroup);
    const departmentStudents = store.students.filter(
      (el) => el.department === filterDepartment
    );
    const a = filterGroup !== "Barcha guruhlar" ? newStudents : store.students;
    if (filterDepartment === "Barcha kafedralar") {
      setFilterStudents(store.students);
    } else {
      setFilterStudents(
        filterGroup === "Barcha guruhlar" ? departmentStudents : newStudents
      );
    }
  }, [store]);
  useEffect(() => {
    setSortedStudents(sortStudentByColor(activeBtnColor, filterStudents));
  }, [filterStudents]);
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
                <span id="count1">{sortedStudents.length} </span>
              </h4>
              <select
                className="absolute left-[30%] top-[20px] bg-white p-[10px]"
                onChange={(e) => {
                  setFilterDepartment(e.target.value);
                  setFilterGroup("Barcha guruhlar");
                  const newGroups =
                    e.target.value === "Barcha kafedralar"
                      ? store.groups
                      : store.groups.filter(
                          (elem) => elem.departmentValue === e.target.value
                        );
                  setFilterGroupsStore(newGroups);

                  let newStudents2 = [];

                  for (let item of newGroups) {
                    newStudents2 = [
                      ...newStudents2,
                      ...store.students.filter(
                        (el) => el.group === item.groupValue
                      ),
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
                <option value="Python">Python</option>
                <option value="Grafik-Dizayn">Grafik-Dizayn</option>
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

                  for (let item of filterGroupsStore) {
                    newStudents2 = [
                      ...newStudents2,
                      ...store.students.filter(
                        (el) => el.group === item.groupValue
                      ),
                    ];
                  }

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
                  return (
                    <option value={elem.groupValue}>{elem.groupValue}</option>
                  );
                })}
              </select>
              <div className="flex gap-[20px] absolute right-[15%] top-[33px]">
                <div
                  className={`border-[1px] cursor-pointer w-[40px] h-[20px] bg-white rounded ${"shadow-[0_3px_10px_rgb(0,0,0,0.2)]"}`}
                  title="reset"
                  onClick={() => {
                    setActiveBtnColor("white");
                    setSortedStudents(
                      sortStudentByColor("white", filterStudents)
                    );
                  }}
                ></div>
                <div
                  className={`flex justify-center items-center text-white cursor-pointer w-[40px] h-[20px] bg-red-500 rounded ${
                    activeBtnColor === "red"
                      ? "shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"
                      : ""
                  }`}
                  title="To`lov qilmagan"
                  onClick={() => {
                    setActiveBtnColor("red");
                    setSortedStudents(
                      sortStudentByColor("red", filterStudents)
                    );
                  }}
                >
                  {sortStudentByColor("red", filterStudents).length}
                </div>
                <div
                  className={`flex justify-center items-center text-white cursor-pointer w-[40px] h-[20px] bg-black rounded ${
                    activeBtnColor === "black"
                      ? "shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"
                      : ""
                  }`}
                  title="To`lov vaqti yetmagan"
                  onClick={() => {
                    setActiveBtnColor("black");
                    setSortedStudents(
                      sortStudentByColor("black", filterStudents)
                    );
                  }}
                >
                  {sortStudentByColor("black", filterStudents).length}
                </div>
                <div
                  className={` flex justify-center items-center text-white cursor-pointer w-[40px] h-[20px] bg-green-500 rounded ${
                    activeBtnColor === "green"
                      ? "shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"
                      : ""
                  }`}
                  title="To`lov qilgan"
                  onClick={() => {
                    setActiveBtnColor("green");
                    setSortedStudents(
                      sortStudentByColor("green", filterStudents)
                    );
                  }}
                >
                  {sortStudentByColor("green", filterStudents).length}
                </div>
              </div>
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

                    <th className="th_9">Kelgan</th>
                    <th className="th_8">To`lov</th>
                    <th className="th_10"></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedStudents.map((elem, index) => {
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
                      {store.groups.map((elem) => (
                        <option value={elem.groupValue}>
                          {elem.groupValue}
                        </option>
                      ))}
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
                      <option value="Python">Python</option>
                      <option value="Grafik-Dizayn">Grafik-Dizayn</option>
                      <option value="Markaz">Markaz</option>
                    </select>
                    <input
                      required
                      className={`form-control ${
                        classStudent ? "studentRed" : ""
                      }`}
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
                    <div className="date__create">
                      <label>Guruhga qo`shilgan sanasi:</label>
                      <input
                        type="date"
                        className="w-[150px] mx-[auto] p-[5px] bg-white text-black border-[1px] border-[black]"
                        value={createdStudentDate}
                        onChange={(e) => {
                          setCreatedStudentDate(e.target.value);
                        }}
                      />
                    </div>
                    <div className="date__create">
                      <label>To`lov sanasi:</label>
                      <input
                        type="date"
                        className="w-[150px] mx-[auto] p-[5px] bg-white text-black border-[1px] border-[black]"
                        value={priceStudentDate}
                        onChange={(e) => {
                          setPriceStudentDate(e.target.value);
                        }}
                      />
                    </div>
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
