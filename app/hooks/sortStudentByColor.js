import moment from "moment";
import { calcPrice } from "./calcPrice";
const sortStudentByColor = (color, filterStudents) => {
  switch (color) {
    case "white": {
      return filterStudents;
    }
    case "red": {
      const date = new Date();
      const date2 = +moment(date).format("DD/MM/YYYY").slice(0, 2);

      const sortedStudent = filterStudents.filter(
        ({ price, foiz, department,priceDate }) =>
          calcPrice(price, foiz, department, priceDate) != 0 &&
          date2 > +moment(priceDate).format("DD/MM/YYYY").slice(0, 2)
      );
      return sortedStudent;
    }
    case "black": {
      const date = new Date();
      const date2 = +moment(date).format("DD/MM/YYYY").slice(0, 2);

      const sortedStudent = filterStudents.filter(
        ({ price, foiz, department,priceDate }) =>
          calcPrice(price, foiz, department, priceDate) != 0 &&
          date2 < +moment(priceDate).format("DD/MM/YYYY").slice(0, 2)
      );
      return sortedStudent;
    }
    case "green": {
      const sortedStudent = filterStudents.filter(
        ({ price, foiz, department,priceDate }) => calcPrice(price, foiz, department) == 0
      );
      return sortedStudent;
    }
    default:
      return filterStudents;
  }
};
export default sortStudentByColor;
