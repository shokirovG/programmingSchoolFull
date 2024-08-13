import React from "react";
import Image from "@/node_modules/next/image";
import { removeKurs } from "@/app/redux/features/kursSlice";
import { useDispatch } from "@/node_modules/react-redux/dist/react-redux";
import KursEditModal from "./KursEditModal";
const KursItem = ({ kurs, price, _id }) => {
  const dispatch = useDispatch();
  const removeKursFn = () => {
    dispatch(removeKurs(_id));
  };
  return (
    <div className="shadow flex p-[20px] w-[30%] justify-between rounded mt-[20px]">
      <span>{kurs}</span>
      <div className="flex gap-[10px]">
        <span>{price} so`m</span>
        <div className="flex items-center gap-[10px]">
          <KursEditModal {...{ kurs, price, _id }} />
          <Image
            src="/remove.png"
            width="18"
            height="18"
            alt="#"
            className="cursor-pointer"
            onClick={removeKursFn}
          />
        </div>
      </div>
    </div>
  );
};

export default KursItem;
