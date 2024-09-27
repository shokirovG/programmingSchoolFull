"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import LessonsTable from "../../components/teacher/LessonsTable";

const Page = () => {
  const { id } = useParams(); 
  const [data, setData] = useState(["24.03.2024", "25.03.2024"]);
  const [selectedDate, setSelectedDate] = useState(""); 

  const AddDate = () => {
    const newDate = new Date().toLocaleDateString("en-GB").replace(/\//g, "."); 
    if (!data.includes(newDate)) {
      setData([...data, newDate]); 
      setSelectedDate(newDate); 
    } else {
      alert("Bu sana allaqachon mavjud.");
    }
  };

  const filteredData = selectedDate ? [selectedDate] : data;

  return (
    <div>
      <div className="flex justify-content-center mt-[70px] gap-4 items-center">
        <div className="kurs__info shadow-sm w-[20%] p-[20px]">
          <p className="text-center uppercase font-bold">Du/Se/Chor</p>
          <div className="flex gap-[20px]">
            <span className="bg-slate-500 text-white p-[5px] text-center">
              18:00-20:00
            </span>
            <span className="bg-green-500 text-white flex justify-content-center items-center p-[5px]">
              O`quvchilar: 10
            </span>
          </div>
        </div>
        <div className="w-min-[20%] w-max-[50%] flex-wrap shadow-md p-[15px] gap-[10px] flex justify-between">
          {data.map((el, index) => (
            <span
              key={index}
              className={`flex gap-[10px] text-white rounded-sm p-[4px] text-[15px] cursor-pointer ${
                el === selectedDate ? "bg-blue-500" : "bg-teal-500"
              }`}
              onClick={() => setSelectedDate(el)} 
            >
              {el}
            </span>
          ))}
          <button
            className="flex justify-center items-center text-[20px] text-black w-[20px] h-[20px] rounded-full"
            onClick={AddDate}
          >
            +
          </button>
        </div>
      </div>

      <LessonsTable data={filteredData} />
    </div>
  );
};

export default Page;

