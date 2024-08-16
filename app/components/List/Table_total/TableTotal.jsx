import numberTrim from "@/app/hooks/number";
import { useSelector } from "@/node_modules/react-redux/dist/react-redux";
import React from "react";
import "./table__total.scss";
import calcPriceTolov from "@/app/hooks/calcPriceTolov";
import calcQarzPrice from "@/app/hooks/calcQarzPrice";
import calcCategoryPrice from "@/app/hooks/calcCategoryPrice";

function TableTotal() {
  const store = useSelector((state) => state);
  const yigildiTotal = store.kurs.kurses.reduce((s, item) => {
    return s + calcPriceTolov(store, item.kurs);
  }, 0);

  const yigilishiKerakTotal = store.kurs.kurses.reduce((s, item) => {
    return s + calcQarzPrice(store, item.kurs);
  }, 0);
  let totalPrice = 0;
  if (store.hisobot.majburiyChiqimlar.length > 0) {
    totalPrice = store.hisobot.majburiyChiqimlar[0].chiqimlar.reduce(
      (s, item) => {
        return s + Number(item.chiqimMiqdori);
      },
      0
    );
  }

  let chiqimlar = [];
  if (store.hisobot.hisobot.length > 0) {
    chiqimlar = store.hisobot.hisobot[0].hisoblar;
  }

  return (
    <div className=" totalTable ">
      <table className="rwd-table">
        <thead>
          <tr>
            <th>Yig`ildi</th>
            <th>Yig`ilishi kerak</th>
            <th>Jami</th>
          </tr>
        </thead>
        <tbody>
          {store.kurs.kurses.map((el) => (
            <tr>
              <td className="flex">
                <div>{el.kurs}</div>
                <div>{numberTrim(calcPriceTolov(store, el.kurs))} so`m</div>
              </td>
              <td className="flex">
                <div>{el.kurs}</div>
                <div>{numberTrim(calcQarzPrice(store, el.kurs))} so`m</div>
              </td>
              <td>
                <div>{el.kurs}</div>
                <div>
                  {numberTrim(
                    calcPriceTolov(store, el.kurs) +
                      calcQarzPrice(store, el.kurs)
                  )}{" "}
                  so`m
                </div>
              </td>
            </tr>
          ))}

          <tr className="table__total_footer">
            <td data-th="Movie Title">Jami: {numberTrim(yigildiTotal)}</td>
            <td>Jami: {numberTrim(yigilishiKerakTotal)}</td>
            <td>Jami: {numberTrim(yigilishiKerakTotal + yigildiTotal)}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex gap-[20px] items-start">
        <table className="rwd-table">
          <thead>
            <tr>
              <th>Majburiy chiqim</th>
            </tr>
          </thead>
          <tbody>
            {store.hisobot.majburiyChiqimlar.length > 0
              ? store.hisobot.majburiyChiqimlar[0].chiqimlar.map((elem) => (
                  <tr key={elem.id}>
                    <td data-th="Movie Title">
                      {elem.chiqimNomi}: {numberTrim(+elem.chiqimMiqdori)} so`m
                    </td>
                  </tr>
                ))
              : null}

            <tr className="table__total_footer">
              <td data-th="Year">Umumiy: {numberTrim(totalPrice)} so`m</td>
            </tr>
          </tbody>
        </table>

        <table className="rwd-table">
          <thead>
            <tr>
              <th>Harajat qilindi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-th="Gross">
                Markaz(Naqd):{" "}
                {chiqimlar?.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Markaz", "Naqd"))
                  : 0}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Markaz(Click):{" "}
                {chiqimlar?.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Markaz", "Click"))
                  : 0}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Avans(Naqd):{" "}
                {chiqimlar?.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Avans", "Naqd"))
                  : 0}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Avans(Click):{" "}
                {chiqimlar?.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Avans", "Click"))
                  : 0}
              </td>
            </tr>

            <tr>
              <td data-th="Gross">
                Kredit(Click):{" "}
                {chiqimlar?.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Kredit", "Click"))
                  : 0}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Kredit(Naqd):{" "}
                {chiqimlar?.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Kredit", "Naqd"))
                  : 0}
              </td>
            </tr>

            <tr>
              <td data-th="Gross">
                Oylik(Naqd):{" "}
                {chiqimlar?.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Oylik", "Naqd"))
                  : 0}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Oylik(Click):{" "}
                {chiqimlar?.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Oylik", "Click"))
                  : 0}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Arenda(Naqd):{" "}
                {chiqimlar?.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Arenda", "Naqd"))
                  : 0}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Arenda(Click):{" "}
                {chiqimlar?.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Arenda", "Click"))
                  : 0}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Qarzlar(Naqd):{" "}
                {chiqimlar?.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Qarzlar", "Naqd"))
                  : 0}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Qarzlar(Click):{" "}
                {chiqimlar?.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Qarzlar", "Click"))
                  : 0}
              </td>
            </tr>
            <tr className="table__total_footer">
              <td data-th="Year">
                Umumiy:{" "}
                {numberTrim(
                  calcCategoryPrice(chiqimlar, "Markaz", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Markaz", "Click") +
                    calcCategoryPrice(chiqimlar, "Avans", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Avans", "Click") +
                    calcCategoryPrice(chiqimlar, "Kredit", "Click") +
                    calcCategoryPrice(chiqimlar, "Kredit", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Oylik", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Oylik", "Click") +
                    calcCategoryPrice(chiqimlar, "Arenda", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Arenda", "Click") +
                    calcCategoryPrice(chiqimlar, "Qarzlar", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Qarzlar", "Click")
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableTotal;
