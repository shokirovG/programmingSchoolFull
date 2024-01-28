function calcPriceTolov(students, department, group = "") {
  const tolov = students.filter((el) => el.department === department);
  const tolovTotal = tolov.reduce((s, item) => {
    if (group !== item.group) {
      return s + Number(item.price);
    } else {
      return s;
    }
  }, 0);
  const tolovTotal_2 = tolov.reduce((s, item) => {
    if (group === item.group) {
      return s + Number(item.price);
    } else {
      return s;
    }
  }, 0);

  if (group === "Front-12") {
    return tolovTotal_2;
  }
  return tolovTotal;
}

export default calcPriceTolov;
