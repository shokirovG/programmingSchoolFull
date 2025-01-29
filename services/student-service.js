const Todos = require("../models/Todos");
class StudentService {
  async studentPrice(month, newStudents) {
    try {
      const data = await Todos.findOneAndUpdate(
        { month },
        { month, students: newStudents }
      );

      return { month, data };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new StudentService();
