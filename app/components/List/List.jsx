"use client";

import React, { useEffect, useState } from "react";
import "./list.css";

import TableTotal from "@/app/components/List/Table_total/TableTotal";

import Income from "@/app/components/List/Income/Income";
import Forced__exit from "@/app/components/List/Forced__exit/Forced__exit";

import { ToastContainer } from "react-toastify";
import ListItem from "./ListItem";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";

import Loader from "../Loader/Loader";

import sortArray from "../../hooks/sortArray";
import Image from "@/node_modules/next/image";

function List() {
  const store = useSelector((state) => state);
  const [tableItems, setTableItems] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (store.hisobot.hisobot.length > 0) {
      setTableItems(store.hisobot.hisobot[0].hisoblar);
    } else {
      setTableItems([]);
    }
  }, [store]);

  return (
    <>
      <ToastContainer />
      {tableItems?.length === 0 && store.loader.loading === "loading" ? (
        <Loader />
      ) : (
        <>
          <div className="List">
            {tableItems?.length > 0 ? (
              <ul style={{ "--length": 30 }}>
                {sortArray(tableItems)?.map((elem, index) => (
                  <ListItem key={elem.kun} {...elem} index={index} />
                ))}
              </ul>
            ) : (
              <h3>Tanlangan oy uchun hisobot topilmadi!</h3>
            )}
            <a href="#footer_">
              {" "}
              <Image
                src="/down-arrow.png"
                width="30"
                height="30"
                alt="bottom"
                className="fixed right-[50px] bottom-[50px] cursor-pointer"
              />
            </a>

            <div className="flex gap-[0px] " id="footer_">
              <Income />
              <Forced__exit />
            </div>
            <TableTotal />
          </div>
        </>
      )}
    </>
  );
}

export default List;
