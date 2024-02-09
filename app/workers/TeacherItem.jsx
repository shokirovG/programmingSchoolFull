import { useSelector } from "@/node_modules/react-redux/dist/react-redux";
import React, { useState } from "react";
import { calcPrice } from "../hooks/calcPrice";
import numberTrim from "../hooks/number";
import WorkerModal from "./WorkerModal";

const TeacherItem = ({
  id,
  department,
  chiqimlar,
  teacher,
  group,
  foiz,
  price,
  priceType,
}) => {
  let avans = 0;
  const [show, setShow] = useState(false);
  const store = useSelector((state) => state);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  for (let item of chiqimlar) {
    for (let el of item.hisobot.chiqim) {
      if (el.costType === "Avans" && el.userAvans === teacher) {
        avans += Number(el.costValue);
      }
    }
  }
  const frontOylik = group.reduce((s, elem) => {
    const hisob = store.students.reduce((s, item) => {
      if (item.group.toUpperCase() === elem.toUpperCase()) {
        const narx = calcPrice(0, item.foiz, department);

        return s + Number(narx);
      } else {
        return s;
      }
    }, 0);

    return s + Number(hisob);
  }, 0);

  let balans = group.reduce((s, elem) => {
    const hisob = store.students.reduce((s, item) => {
      if (item.group.toUpperCase() === elem.toUpperCase()) {
        const narx = item.price;

        return s + Number(narx);
      } else {
        return s;
      }
    }, 0);

    return s + Number(hisob);
  }, 0);

  return (
    <>
      <div
        className="workers__item  w-[25%] min-h-[200px] rounded-[15px] "
        onClick={handleShow}
      >
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
            {(balans * foiz) / 100 - avans > 0 ? (
              <span className="text-green-500">
                +{numberTrim((balans * foiz) / 100 - avans)}
              </span>
            ) : (
              <span className="text-red-500">{numberTrim(balans - avans)}</span>
            )}
          </div>
        </div>
        <div className="p-[20px]">
          <p>
            <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px] mr-[10px]">
              Oylik
            </span>
            {numberTrim((frontOylik * foiz) / 100)} so`m
          </p>
          <p>
            <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px] mr-[10px]">
              Avans
            </span>{" "}
            <span className="text-red-500">{numberTrim(avans)}</span> so`m
          </p>
          <p>
            <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px] mr-[10px]">
              Qoldiq
            </span>
            <span className="text-green-500">
              +{numberTrim((frontOylik * foiz) / 100 - avans)}
            </span>{" "}
            so`m
          </p>
        </div>
      </div>
      <WorkerModal
        show={show}
        handleClose={handleClose}
        name={teacher}
        priceType={priceType}
        priceFoiz={foiz}
        price={price}
        groups={group}
        department={department}
        id={id}
      />
      {/* modalga props berish kerak worker  */}
    </>
  );
};

export default TeacherItem;
