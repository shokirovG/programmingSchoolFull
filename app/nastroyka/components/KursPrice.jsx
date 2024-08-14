import React, { useState } from "react";

import KursItem from "./KursItem";
import NewKursModal from "./NewKursModal";
import { useSelector } from "@/node_modules/react-redux/dist/react-redux";
const KursPrice = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const store = useSelector((state) => state);
  console.log("kurs", store.kurs);
  return (
    <div className="shadow text-center p-[20px] rounded  min-h-[200px] flex flex-col  gap-[20px] pb-[50px]">
      <h4>Kurslar narxlari</h4>
      <div className="flex flex-wrap justify-evenly">
        {store.kurs.kurses.map((kurs) => (
          <KursItem key={kurs._id} {...kurs} />
        ))}
      </div>
      <div className="flex justify-center mt-[30px]">
        <button
          className="p-[10px] bg-green-500 text-white rounded hover:shadow-md"
          onClick={handleShow}
        >
          Yangi kurs qo`shish
        </button>
      </div>
      <NewKursModal show={show} handleClose={handleClose} />
    </div>
  );
};

export default KursPrice;
