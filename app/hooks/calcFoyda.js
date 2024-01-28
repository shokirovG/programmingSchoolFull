function calcFoyda(arr, majburiyChiqim, kirimlar) {
  console.log(kirimlar);

  const s_2 = majburiyChiqim.chiqimlar.reduce((s, item) => {
    if (item.chiqimNomi !== "Avans") {
      return s + Number(item.chiqimMiqdori);
    }
  }, 0);
  // let s = 0;
  // for (let item of arr) {
  //   for (let el of item.hisobot.chiqim) {
  //     if (el.costType !== "Avans" && el.costType !== "Oylik") {
  //       s += Number(el.costValue);
  //     }
  //   }
  // }
  return kirimlar - s_2;
}

export default calcFoyda;
