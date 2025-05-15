const StudentsData = require("../models/Todos");

class AttendanceGroupController {
  async updateGroupAttendance(req, res) {
    try {
      const { month, groupname, date } = req.body;

      if (!month || !groupname || !Array.isArray(date) || date.length === 0) {
        return res.status(400).json({ message: "Ma'lumotlar to'liq emas!" });
      }

      const monthDoc = await StudentsData.findOne({ month });

      if (!monthDoc) {
        return res.status(404).json({ message: `Bu oy (${month}) uchun ma'lumotlar topilmadi!` });
      }

      let affectedStudents = 0;

      monthDoc.students.forEach(student => {
        if (student.group === groupname) {
          // Eski attendanceGroup o'chiriladi va yangi ma'lumotlar yoziladi
          student.attendanceGroup = date.map(entry => ({
            lessonDate: entry.lessonDate,
            isCome: entry.isCome
          }));

          affectedStudents++;
        }
      });

      if (affectedStudents === 0) {
        return res.status(404).json({ message: `Guruh "${groupname}" uchun o‘quvchi topilmadi!` });
      }

      await monthDoc.save();

      res.status(200).json({
        message: `Davomat yangilandi. ${affectedStudents} ta o‘quvchining davomat ma'lumotlari almashtirildi.`,
      });

    } catch (error) {
      console.error("Davomatda xatolik:", error);
      res.status(500).json({ message: "Server xatoligi!" });
    }
  }
}

module.exports = new AttendanceGroupController();
