const Todos = require("../models/Todos");

class StudentService {
  async studentPrice(month, newStudents) {
    try {
      // Agar students bo'sh bo'lsa, xatolik qaytarish
      if (!newStudents || newStudents.length === 0) {
        console.log("Yuborilgan students bo'sh yoki noto'g'ri formatda");
        return { message: "Yuborilgan students bo'sh yoki noto'g'ri formatda" };
      }

      // Hujjatni topish
      const data = await Todos.findOneAndUpdate(
        { month },
        { $set: { students: newStudents } },
        { new: true }
      );

      if (!data) {
        console.log("Hujjat topilmadi, month:", month);
        return { message: "Bunday oy topilmadi!" };
      }

      return data; // Yangilangan ma'lumotni qaytaramiz
    } catch (error) {
      console.log(error);
      return { message: "Xatolik yuz berdi!" };
    }
  }
}

module.exports = new StudentService();
