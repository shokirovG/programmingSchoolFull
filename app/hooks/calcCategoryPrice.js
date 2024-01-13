function calcCategoryPrice(chiqimlar, category, type) {
  console.log(chiqimlar);
  let chiqimlarTotal = 0;
  for (let el of chiqimlar) {
    const chiqimlarFilter = el.hisobot.chiqim.filter(
      (i) => i.costType == category && i.tolovType == type
    );

    el.hisobot.chiqim.forEach((a) => {
      console.log("el", a);
    });
    chiqimlarTotal += chiqimlarFilter.reduce((s, item) => {
      return s + Number(item.costValue);
    }, 0);
    console.log("total:", chiqimlarTotal);
  }

  return chiqimlarTotal;
}

export default calcCategoryPrice;
