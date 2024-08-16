function calcQarzPrice(store, department) {
  
  const kursData = store.kurs.kurses.filter((el) => el.kurs === department);
  if (kursData.length > 0) {
    const studentsFilter = store.student.students.filter(
      (el) => el.department === department
    );
    const totalPrice = studentsFilter.reduce((s, item) => {
      return s + kursData[0].price - Number(item.price) - Number(item.foiz);
    }, 0);

    return totalPrice;
  } else {
    return 0;
  }
}

export default calcQarzPrice;
