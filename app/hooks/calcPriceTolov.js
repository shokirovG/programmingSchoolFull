function calcPriceTolov(store, department) {
  const studentsFilter = store.student.students.filter(
    (el) => el.department === department
  );
  const totalPrice = studentsFilter.reduce((s, item) => {
    return s + Number(item.price);
  }, 0);

  return totalPrice;
}

export default calcPriceTolov;
