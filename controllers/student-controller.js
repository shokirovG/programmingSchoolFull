const Todos = require("../models/Todos");
const studentService = require("../services/student-service");

class StudentController {
  async studentPrice(req, res, next) {
    try {
      const { tolovValue, studentId, month } = req.body;

      const result = await Todos.updateOne(
        { month, "students._id": studentId },
        { $inc: { "students.$.price": Number(tolovValue) } }
      );

      // Yangilangan hujjatni qayta olish (agar kerak bo‘lsa):
      const updatedDoc = await Todos.findOne({ month });

      return res.json({ data: updatedDoc });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new StudentController();
