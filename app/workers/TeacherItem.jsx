import React from "react";
import { calcPrice } from "../hooks/calcPrice";
import numberTrim from "../hooks/number";

const TeacherItem = ({
  front,
  department,
  chiqimlar,
  teacher,
  group,
  foiz,
}) => {
  let avans = 0;
  console.log(chiqimlar);
  for (let item of chiqimlar) {
    for (let el of item.hisobot.chiqim) {
      console.log("a", el);
      if (el.costType === "Avans" && el.userAvans === teacher) {
        avans += Number(el.costValue);
      }
    }
  }
  const frontOylik = front.reduce((s, item) => {
    if (item.group !== "Front-12") {
      const narx = calcPrice(0, item.foiz, department);
      return s + Number(narx);
    } else {
      if (teacher !== "Obid") {
        return s + 0;
      } else {
        const narx = calcPrice(0, item.foiz, department);
        return s + Number(narx);
      }
    }
  }, 0);
  return (
    <div className="workers__item  w-[25%] min-h-[200px] rounded-[15px] ">
      <div className="border-b-[1px] bg-slate-200 py-[8px]  rounded-[15px] border-black-200 flex h-[100px] items-center px-[10px] gap-[20px]">
        <span className="text-[25px] ">{teacher}</span>
        <div className="teacher__groups flex gap-[10px] flex-wrap ">
          {group.map((elem) => (
            <span
              key={elem}
              className="bg-emerald-400 text-white p-[3px] rounded-[5px] text-[14px] text-"
            >
              {elem}
            </span>
          ))}
        </div>
      </div>
      <div className="p-[20px]">
        <p>
          <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px]">
            Oylik
          </span>
          : {numberTrim(frontOylik * foiz)} so`m
        </p>
        <p>
          <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px]">
            Avans
          </span>{" "}
          : {numberTrim(avans)} so`m
        </p>
        <p>
          <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px]">
            Qoldiq
          </span>
          : {numberTrim(frontOylik * foiz - avans)} so`m
        </p>
      </div>
    </div>
  );
};

export default TeacherItem;
