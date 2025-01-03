"use client";

import Image from "@/node_modules/next/image";
import { Form } from "@/node_modules/react-bootstrap/esm/index";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "../components/Students/Spinner";

import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader/Loader";
import { redirect } from "next/navigation";
import {
  loaded,
  loading,
  spinnerLoaded,
  spinnerLoading,
} from "../redux/features/loaderSlice";
/* eslint-disable */
import KursPrice from "./components/KursPrice";
import { getKurses, setKurses } from "../redux/features/kursSlice";
function page() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [monthClone_1, setMonthClone_1] = useState("1_2025");
  const [monthClone_2, setMonthClone_2] = useState("2_2025");
  const monthArray = [
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
  const dispatch = useDispatch();
  const { request } = useFetch();
  useEffect(() => {
    dispatch(loading());
    setMonthClone_1("1_2025");
    setMonthClone_2("2_2025");
    dispatch(getKurses({ month: localStorage.getItem("currentMonth") }));
    dispatch(loaded());
  }, []);
  
  const monthCloneFn = () => {
    let setCurrentStudents = [];
    let setCurrentWorkers = [];
    let setCurrentGroups = [];
    dispatch(spinnerLoading());
    dispatch(setKurses({ month: monthClone_1, cloneMonth: monthClone_2 }));
    request(`${process.env.NEXT_PUBLIC_URL}/students`)
      .then((res) => {
        res.students.forEach((elem) => {
          if (elem.month == monthClone_1) {
            setCurrentStudents = elem.students;
            // dispatch(fetchedStudents(elem.students));
          }
        });
        const newStudents = setCurrentStudents.map((elem) => ({
          ...elem,
          foiz: 0,
          price: 0,
        }));

        request(
          `${process.env.NEXT_PUBLIC_URL}/students`,
          "POST",
          JSON.stringify({ month: monthClone_2, students: newStudents })
        )
          .then((res) => {
            handleClose();
            toast.success("nusxalash bajarildi!");
            dispatch(spinnerLoaded());
          })
          .catch((e) => {
            toast.error("ma`lumot yuborishda hatolik yuz berdi!");
          });
      })

      .catch((e) => {
        toast.error("ma`lumot olishda xatolik yuz berdi!");
      });
    request(`${process.env.NEXT_PUBLIC_URL}/workers`)
      .then((res) => {
        res.workers.forEach((elem) => {
          if (elem.month == monthClone_1) {
            setCurrentWorkers = elem.workers;
            // dispatch(fetchedStudents(elem.students));
          }
        });

        request(
          `${process.env.NEXT_PUBLIC_URL}/workers`,
          "POST",
          JSON.stringify({ month: monthClone_2, workers: setCurrentWorkers })
        )
          .then((res) => {
            handleClose();
          })
          .catch((e) => {
            toast.error(
              "ishchilarni ma`lumotini bazaga qo'shishda xatolik yuz berdi!"
            );
          });
      })

      .catch((e) => {
        toast.error("ishchilarni ma`lumotini olishda xatolik yuz berdi!");
      });

    request(`${process.env.NEXT_PUBLIC_URL}/tables`)
      .then((res) => {
        res.groups.forEach((elem) => {
          if (elem.month == monthClone_1) {
            setCurrentGroups = elem.groups;
            // dispatch(fetchedStudents(elem.students));
          }
        });

        request(
          `${process.env.NEXT_PUBLIC_URL}/tables`,
          "POST",
          JSON.stringify({ month: monthClone_2, groups: setCurrentGroups })
        )
          .then((res) => {
            handleClose();
          })
          .catch((e) => {
            toast.error(
              "ishchilarni ma`lumotini bazaga qo'shishda xatolik yuz berdi!"
            );
          });
      })

      .catch((e) => {
        toast.error("ishchilarni ma`lumotini olishda xatolik yuz berdi!");
      });
  };
  if (store.loader.loading === "loading") {
    return <Loader />;
  }
  if (store.auth.user.rol === "admin") {
    localStorage.setItem("currentPage", "students");

    redirect("/students");
  }
  
  return (
    <div className="flex flex-col items-center pt-[150px]">
      <div className="container w-[80%] flex flex-col gap-[50px] pb-[150px]">
        <div className="monthClone text-center p-[20px] rounded  min-h-[200px] flex flex-col items-center gap-[20px]">
          <h4>Eski oydan nusxa olish</h4>
          <div className="flex gap-[30px] items-center">
            <div className="w-[200px] flex flex-col gap-[10px]">
              <Form.Select
                value={monthClone_1}
                onChange={(e) => {
                  setMonthClone_1(e.target.value);
                }}
              >
                {monthArray.map((month, index) => (
                  <option value={index + 1 + "_" + monthClone_1.split("_")[1]}>
                    {month}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                value={monthClone_1}
                onChange={(e) => {
                  setMonthClone_1(e.target.value);
                }}
              >
                <option
                  id="monthOption"
                  value={monthClone_1.split("_")[0] + "_" + "2024"}
                >
                  2024
                </option>
                <option
                  id="monthOption"
                  value={monthClone_1.split("_")[0] + "_" + "2025"}
                  className="active__month"
                >
                  2025
                </option>
                <option
                  id="monthOption"
                  value={monthClone_1.split("_")[0] + "_" + "2026"}
                >
                  2026
                </option>
                <option
                  id="monthOption"
                  value={monthClone_1.split("_")[0] + "_" + "2027"}
                >
                  2027
                </option>
              </Form.Select>
            </div>
            <div>
              <Image src="arrow-right.svg" width="45" height="45" />
            </div>
            <div className="w-[200px] flex flex-col gap-[10px]">
              <Form.Select
                value={monthClone_2}
                onChange={(e) => {
                  setMonthClone_2(e.target.value);
                }}
              >
                {monthArray.map((month, index) => (
                  <option value={index + 1 + "_" + monthClone_2.split("_")[1]}>
                    {month}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                value={monthClone_2}
                onChange={(e) => {
                  setMonthClone_2(e.target.value);
                }}
              >
                <option
                  id="monthOption"
                  value={monthClone_2.split("_")[0] + "_" + "2024"}
                >
                  2024
                </option>
                <option
                  id="monthOption"
                  value={monthClone_2.split("_")[0] + "_" + "2025"}
                  className="active__month"
                >
                  2025
                </option>
                <option
                  id="monthOption"
                  value={monthClone_2.split("_")[0] + "_" + "2026"}
                >
                  2026
                </option>
                <option
                  id="monthOption"
                  value={monthClone_2.split("_")[0] + "_" + "2027"}
                >
                  2027
                </option>
              </Form.Select>
            </div>
          </div>
          <div>
            <Button variant="primary" onClick={handleShow}>
              Nusxalash
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Nusxalash</Modal.Title>
              </Modal.Header>
              <Modal.Body>Nusxalashga rozimisiz ?!</Modal.Body>
              <Modal.Footer>
                {store.loader.spinnerLoader === "loading" ? (
                  <Spinner />
                ) : (
                  <div className="flex gap-[10px]">
                    <Button variant="danger" onClick={handleClose}>
                      Yo`q
                    </Button>
                    <Button variant="success" onClick={monthCloneFn}>
                      Xa roziman
                    </Button>
                  </div>
                )}
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        <KursPrice />
      </div>
    </div>
  );
}

export default page;
