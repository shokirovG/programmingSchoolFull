function calcPriceTolov(students, department) {
  const tolov = students.filter((el) => el.department === department);
  const tolovTotal = tolov.reduce((s, item) => {
    return s + Number(item.price);
  }, 0);
  console.log(tolovTotal);
  return tolovTotal;
}

export default calcPriceTolov;
