import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import numberTrim from "../hooks/number";
import calcFoyda from "@/app/hooks/calcFoyda";
import calcPriceTolov from "@/app/hooks/calcPriceTolov";
import calcQarzPrice from "@/app/hooks/calcQarzPrice";
import calcCategoryPrice from "@/app/hooks/calcCategoryPrice";
import useFetch from "../hooks/useFetch";
import { fetchedMajburiy } from "../redux/actions";
const FoydaItem = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useFetch();
  // const [majburiyTotal, setMajburiyTotal] = useState(0);
  let majburiyTotal = 0;
  console.log(
    "a",
    calcPriceTolov(store.students, "Dasturlash", "G`iyos", "Front-12")
  );
  // useEffect(() => {
  //   const currentMonthChiqim = store.majburiyChiqimlar.filter(
  //     (el) => el.month === localStorage.getItem("currentMonth")
  //   );

  //   currentMonthChiqim[0] && setData(currentMonthChiqim[0].chiqimlar);
  // }, [store]);
  let chiqimlar = [];
  if (store.hisobot.length > 0) {
    chiqimlar = store.hisobot[0].hisoblar;
  }

  if (store.majburiyChiqimlar.length > 0) {
    majburiyTotal = store.majburiyChiqimlar[0].chiqimlar.reduce((s, item) => {
      if ((item.chiqimNomi !== "Avans", item.chiqimNomi !== "Oylik")) {
        return s + Number(item.chiqimMiqdori);
      } else {
        return s;
      }
    }, 0);
    // setMajburiyTotal(majburiyT);
  }
  console.log(store.majburiyChiqimlar);
  let foydaBalans = 0;
  for (let item of store.students) {
    if (item.department === "Ingliz-tili" || item.group === "Front-12") {
      foydaBalans += item.price * 0.5;
    }
    if (item.department === "Scretch") {
      foydaBalans += item.price * 0.75;
    }
    if (
      item.department === "K.S" ||
      item.group === "Front-5" ||
      item.group === "Front-8" ||
      item.group === "Front-10" ||
      item.group === "Front-13" ||
      item.group === "Front-14"
    ) {
      foydaBalans += item.price * 0.4;
    }
    if (item.department === "Markaz") {
      foydaBalans += item.price;
    }
  }

  useEffect(() => {
    request(`${process.env.NEXT_PUBLIC_URL}/chiqimlar`).then((res) => {
      const currentMonthChiqim = res.chiqimlar.filter(
        (el) => el.month === localStorage.getItem("currentMonth")
      );
      console.log("use", res);
      dispatch(fetchedMajburiy(currentMonthChiqim));
    });
  }, []);
  console.log(calcQarzPrice(store.students, "Dasturlash"), "obid");
  return (
    <div className="workers__item  w-[25%] min-h-[200px] rounded-[15px] ">
      <div className="border-b-[1px] bg-slate-200 py-[8px]  rounded-[15px] border-black-200 flex h-[100px] items-center px-[10px] gap-[15px]">
        <span className="text-[22px] ">Markaz</span>{" "}
        <span>
          {Number(foydaBalans) -
            (calcCategoryPrice(chiqimlar, "Markaz", "Naqd") +
              calcCategoryPrice(chiqimlar, "Markaz", "Click") +
              calcCategoryPrice(chiqimlar, "Kredit", "Click") +
              calcCategoryPrice(chiqimlar, "Kredit", "Naqd") +
              calcCategoryPrice(chiqimlar, "Arenda", "Naqd") +
              calcCategoryPrice(chiqimlar, "Arenda", "Click") +
              calcCategoryPrice(chiqimlar, "Qarz", "Naqd") +
              calcCategoryPrice(chiqimlar, "Qarz", "Click")) >=
          0 ? (
            <span className="text-green-500">
              +
              {numberTrim(
                foydaBalans -
                  (calcCategoryPrice(chiqimlar, "Markaz", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Markaz", "Click") +
                    calcCategoryPrice(chiqimlar, "Kredit", "Click") +
                    calcCategoryPrice(chiqimlar, "Kredit", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Arenda", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Arenda", "Click") +
                    calcCategoryPrice(chiqimlar, "Qarz", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Qarz", "Click"))
              )}
            </span>
          ) : (
            <span className="text-red-500">
              {numberTrim(
                foydaBalans -
                  (calcCategoryPrice(chiqimlar, "Markaz", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Markaz", "Click") +
                    calcCategoryPrice(chiqimlar, "Kredit", "Click") +
                    calcCategoryPrice(chiqimlar, "Kredit", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Arenda", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Arenda", "Click") +
                    calcCategoryPrice(chiqimlar, "Qarz", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Qarz", "Click"))
              )}
            </span>
          )}
        </span>
        /
        <span>
          {Number(foydaBalans) -
            (calcCategoryPrice(chiqimlar, "Markaz", "Naqd") +
              calcCategoryPrice(chiqimlar, "Markaz", "Click")) -
            Number(majburiyTotal) >
          0 ? (
            <span className="text-green-500">
              +
              {numberTrim(
                foydaBalans -
                  (calcCategoryPrice(chiqimlar, "Markaz", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Markaz", "Click")) -
                  Number(majburiyTotal)
              )}
            </span>
          ) : (
            <span className="text-red-500">
              {numberTrim(
                foydaBalans -
                  (calcCategoryPrice(chiqimlar, "Markaz", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Markaz", "Click")) -
                  Number(majburiyTotal)
              )}
            </span>
          )}
        </span>
      </div>
      <div className="p-[20px]">
        <p>
          <span className="oylik__span  bg-slate-200 w-[100px] p-[7px] rounded-[10px] mr-[10px]">
            Foyda
          </span>
          <span className=" ">
            {""}
            {numberTrim(
              calcFoyda(
                chiqimlar,
                store.majburiyChiqimlar.length > 0
                  ? store.majburiyChiqimlar[0]
                  : { chiqimlar: [] },
                calcPriceTolov(store.students, "Dasturlash", "") * 0.4
                // calcPriceTolov(store.students, "Markaz") +
                // calcPriceTolov(store.students, "Dasturlash", "Front-12") *
                //   0.5 +
                // calcPriceTolov(store.students, "K.S") * 0.4 +
                // calcPriceTolov(store.students, "Ingliz-tili") * 0.5 +
                // calcPriceTolov(store.students, "Scretch") * 0.75 +
                // calcQarzPrice(store.students, "Dasturlash") * 0.4 +
                // calcQarzPrice(store.students, "Dasturlash", "Front-12") *
                //   0.5 +
                // calcQarzPrice(store.students, "K.S") * 0.4 +
                // calcQarzPrice(store.students, "Ingliz-tili") * 0.5 +
                // calcQarzPrice(store.students, "Scretch") * 0.75
              )
            )}{" "}
          </span>
          so`m
        </p>
        <p>
          <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px]  mr-[10px]">
            Ishlatilgan
          </span>{" "}
          <span className="text-red-500">
            {" "}
            {numberTrim(
              calcCategoryPrice(chiqimlar, "Markaz", "Naqd") +
                calcCategoryPrice(chiqimlar, "Markaz", "Click")
            )}
          </span>{" "}
          so`m
        </p>
        <p>
          <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px]  mr-[10px]">
            Qoldiq
          </span>
          <span className="text-green-500">
            {calcFoyda(
              chiqimlar,
              store.majburiyChiqimlar.length > 0
                ? store.majburiyChiqimlar[0]
                : { chiqimlar: [] },
              calcPriceTolov(store.students, "Dasturlash") * 0.4 +
                calcPriceTolov(store.students, "Markaz") +
                calcPriceTolov(store.students, "Dasturlash", "Front-12") * 0.5 +
                calcPriceTolov(store.students, "K.S") * 0.4 +
                calcPriceTolov(store.students, "Ingliz-tili") * 0.5 +
                calcPriceTolov(store.students, "Scretch") * 0.75 +
                calcQarzPrice(store.students, "Dasturlash") * 0.4 +
                calcQarzPrice(store.students, "Markaz") +
                calcQarzPrice(store.students, "Dasturlash", "Front-12") * 0.5 +
                calcQarzPrice(store.students, "K.S") * 0.4 +
                calcQarzPrice(store.students, "Ingliz-tili") * 0.5 +
                calcQarzPrice(store.students, "Scretch") * 0.75
            ) -
              (calcCategoryPrice(chiqimlar, "Markaz", "Naqd") +
                calcCategoryPrice(chiqimlar, "Markaz", "Click")) <
            0 ? (
              <span className="text-red-500">
                {numberTrim(
                  calcFoyda(
                    chiqimlar,
                    store.majburiyChiqimlar.length > 0
                      ? store.majburiyChiqimlar[0]
                      : { chiqimlar: [] },
                    calcPriceTolov(store.students, "Dasturlash") * 0.4 +
                      calcPriceTolov(store.students, "Markaz") +
                      calcPriceTolov(store.students, "Dasturlash", "Front-12") *
                        0.5 +
                      calcPriceTolov(store.students, "K.S") * 0.4 +
                      calcPriceTolov(store.students, "Ingliz-tili") * 0.5 +
                      calcPriceTolov(store.students, "Scretch") * 0.75 +
                      calcQarzPrice(store.students, "Dasturlash") * 0.4 +
                      calcQarzPrice(store.students, "Markaz") +
                      calcQarzPrice(store.students, "Dasturlash", "Front-12") *
                        0.5 +
                      calcQarzPrice(store.students, "K.S") * 0.4 +
                      calcQarzPrice(store.students, "Ingliz-tili") * 0.5 +
                      calcQarzPrice(store.students, "Scretch") * 0.75
                  ) -
                    (calcCategoryPrice(chiqimlar, "Markaz", "Naqd") +
                      calcCategoryPrice(chiqimlar, "Markaz", "Click"))
                )}
              </span>
            ) : (
              <span className="text-green-500">
                {"+"}
                {numberTrim(
                  calcFoyda(
                    chiqimlar,
                    store.majburiyChiqimlar.length > 0
                      ? store.majburiyChiqimlar[0]
                      : { chiqimlar: [] },
                    calcPriceTolov(store.students, "Dasturlash") * 0.4 +
                      calcPriceTolov(store.students, "Markaz") +
                      calcPriceTolov(store.students, "Dasturlash", "Front-12") *
                        0.5 +
                      calcPriceTolov(store.students, "K.S") * 0.4 +
                      calcPriceTolov(store.students, "Ingliz-tili") * 0.5 +
                      calcPriceTolov(store.students, "Scretch") * 0.75 +
                      calcQarzPrice(store.students, "Dasturlash") * 0.4 +
                      calcQarzPrice(store.students, "Markaz") +
                      calcQarzPrice(store.students, "Dasturlash", "Front-12") *
                        0.5 +
                      calcQarzPrice(store.students, "K.S") * 0.4 +
                      calcQarzPrice(store.students, "Ingliz-tili") * 0.5 +
                      calcQarzPrice(store.students, "Scretch") * 0.75
                  ) -
                    (calcCategoryPrice(chiqimlar, "Markaz", "Naqd") +
                      calcCategoryPrice(chiqimlar, "Markaz", "Click"))
                )}
              </span>
            )}
          </span>{" "}
          so`m
        </p>
      </div>
    </div>
  );
};

export default FoydaItem;
