import React from "react";

const AdminItem = ({ teacher, students, chiqimlar }) => {
  let avans = 0;

  for (let item of chiqimlar) {
    for (let el of item.hisobot.chiqim) {
      console.log("a", el);
      if (el.costType === "Avans" && el.userAvans === teacher) {
        avans += Number(el.costValue);
      }
    }
  }

  return (
    <div className="workers__item  w-[25%] min-h-[200px] rounded-[15px] ">
      <div className="border-b-[1px] bg-slate-200 py-[8px]  rounded-[15px] border-black-200 flex h-[100px] items-center px-[10px] gap-[20px]">
        <span className="text-[25px] ">{teacher}</span>
      </div>
      <div className="p-[20px]">
        <p>
          <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px]">
            Oylik
          </span>
          : {numberTrim(adminOylik)} so`m
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
          : {numberTrim(adminOylik - avans)} so`m
        </p>
      </div>
    </div>
  );
};

export default AdminItem;
