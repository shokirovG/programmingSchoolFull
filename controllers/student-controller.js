const studentService = require("../services/student-service");

class StudentController {
  async studentPrice(req, res, next) {
    try {
      const { tolovValue, studentValue, month, students } = req.body;
      const newStudents = students.map((el) => {
        if (el.name === studentValue) {
          return {
            ...el,
            price: Number(el.price) + Number(tolovValue),
          };
        } else {
          return el;
        }
      });
      console.log("api students", newStudents, month);
      const studentData = await studentService.studentPrice(month, newStudents);
      
      return res.json(studentData);
    } catch (error) {
      console.log(error);
    }
    next();
  }
}

module.exports = new StudentController();
