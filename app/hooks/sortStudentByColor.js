import moment from "moment";
import { calcPrice } from "./calcPrice";

const sortStudentByColor = (color, filterStudents) => {
  const date = new Date();
  const dateMonth = date.getMonth() + 1;
  switch (color) {
    case "white": {
      return filterStudents;
    }
    case "red": {
      const date = new Date();
      const date2 = +moment(date).format("DD/MM/YYYY").slice(0, 2);

      let sortedStudent = [];
      for (let student of filterStudents) {
        const { price, foiz, department, priceDate } = student;
        const studentMonthPrice = moment(priceDate)
          .format("DD/MM/YYYY")
          .split("/");
        if (
          +studentMonthPrice[1] < dateMonth &&
          calcPrice(price, foiz, department, priceDate) != 0
        ) {
          sortedStudent.push(student);
        } else if (
          date2 >= +moment(priceDate).format("DD/MM/YYYY").slice(0, 2) &&
          calcPrice(price, foiz, department, priceDate) != 0
        ) {
          sortedStudent.push(student);
        }
      }

      return sortedStudent;
    }
    case "black": {
      const date = new Date();
      const date2 = +moment(date).format("DD/MM/YYYY").slice(0, 2);

      let sortedStudent = [];
      for (let student of filterStudents) {
        const { price, foiz, department, priceDate } = student;
        const studentMonthPrice = moment(priceDate)
          .format("DD/MM/YYYY")
          .split("/");
        if (
          +studentMonthPrice[1] >= dateMonth &&
          calcPrice(price, foiz, department, priceDate) != 0 &&
          date2 < +moment(priceDate).format("DD/MM/YYYY").slice(0, 2)
        ) {
          sortedStudent.push(student);
        }
      }

      return sortedStudent;
    }
    case "green": {
      const sortedStudent = filterStudents.filter(
        ({ price, foiz, department, priceDate }) =>
          calcPrice(price, foiz, department) == 0
      );
      return sortedStudent;
    }
    default:
      return filterStudents;
  }
};
export default sortStudentByColor;
