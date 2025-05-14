const StudentsData = require("../models/Todos");

class AttendanceGroupController {
  async updateGroupAttendance(req, res) {
    try {
      const { groupname, date } = req.body;

      if (!groupname || !Array.isArray(date) || date.length === 0) {
        return res.status(400).json({ message: "Ma'lumot to'liq emas!" });
      }

      // 1. Ushbu guruhda o‘qiyotgan o‘quvchilarni topamiz
      const studentDoc = await StudentsData.findOne({ 'students.group': groupname });

      if (!studentDoc) {
        return res.status(404).json({ message: "Bu guruhda o‘quvchilar topilmadi!" });
      }

      // 2. Har bir studentga attendance yozuvlarini qo‘shamiz
      studentDoc.students.forEach(student => {
        if (student.group === groupname) {
          // date array ichidagi har bir darsni attendance ga qo‘shish
          date.forEach(entry => {
            student.attendanceGroup.push({
              lessonDate: entry.lessonDate,
              isCome: entry.isCome
            });
          });
        }
      });

      // 3. O'zgarishlarni saqlaymiz
      await studentDoc.save();

      res.status(200).json({ message: "Davomat muvaffaqiyatli qo‘shildi!" });

    } catch (error) {
      console.error("Davomatda xatolik:", error);
      res.status(500).json({ message: "Server xatoligi!" });
    }
  }
}

module.exports = new AttendanceGroupController();
