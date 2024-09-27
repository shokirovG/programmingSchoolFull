"use client";

import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import React, { useEffect } from "react";
import TeacherItem from "./TeacherItem";
import { getTeachers } from "../../redux/features/teacherSlice";
const TeacherList = () => {
  const teachers = useSelector((state) => state.teacher.teachers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeachers());
  }, []);

  return (
    <div className="teacher_wrapper py-[90px] px-[30px] flex justify-center gap-[30px] flex-wrap">
      {teachers.map((teacher) => (
        <TeacherItem key={teacher.id} {...teacher} />
      ))}
    </div>
  );
};

export default TeacherList;
