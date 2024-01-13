"use client";

import { fetchedStudents } from "@/app/redux/actions";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "@/app/hooks/useFetch";
import { toast } from "react-toastify";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const StudentRemoveModal = ({ name, group, id }) => {
  const [show, setShow] = useState(false);
  const { request } = useFetch();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const removeStudent = () => {
    const newStudents = store.students.filter((elem) => elem.id !== id);
    request(
      `${process.env.NEXT_PUBLIC_URL}/students`,
      "PUT",
      JSON.stringify({ month: store.currentMonth, students: newStudents })
    ).then(() => {
      setShow(false);
      toast.error(`${name} bazadan o'chirildi`);
      dispatch(fetchedStudents(newStudents));
    });
  };
  return (
    <div>
      <Image
        src="/remove.png"
        width="18"
        height="18"
        alt="#"
        className="cursor-pointer mr-[20px]"
        onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>O'quvchini bazadan o'chirish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>{name}</b>
          <i>({group})</i> ni o'chirishni aniq istaysizmi ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={removeStudent}>
            o'chirish
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default StudentRemoveModal;
