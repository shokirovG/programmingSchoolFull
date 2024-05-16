function calcFoyda(arr, majburiyChiqim, kirimlar) {
 
  const s_2 = majburiyChiqim.chiqimlar.reduce((s, item) => {
    if (item.chiqimNomi != "Avans" && item.chiqimNomi != "Oylik") {
      return s + Number(item.chiqimMiqdori);
    } else {
      return s;
    }
  }, 0);


  return kirimlar - s_2;
}

export default calcFoyda;
