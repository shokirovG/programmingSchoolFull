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
  async  updateIsCome  (req, res) {
  try { 
    const { month, studentId, lessonDate, isCome } = req.body;

    if (!month || !studentId || !lessonDate || !isCome) {
      return res.status(400).json({ message: "month, studentId, lessonDate va isCome kerak." });
    }

    const updatedDoc = await StudentsData.findOneAndUpdate(
      {
        month,
        "students.id": studentId,
        "students.attendanceGroup.lessonDate": lessonDate
      },
      {
        $set: {
          "students.$[student].attendanceGroup.$[group].isCome": isCome
        }
      },
      {
        arrayFilters: [
          { "student.id": studentId },
          { "group.lessonDate": lessonDate }
        ],
        new: true
      }
    );

    if (!updatedDoc) {
      return res.status(404).json({ message: "Talaba yoki sana topilmadi." });
    }

    res.json({ message: "isCome muvaffaqiyatli yangilandi", data: updatedDoc });
  } catch (error) {
    console.error("Xatolik:", error);
    res.status(500).json({ message: "Server xatosi" });
  }
};

}

module.exports = new AttendanceGroupController();
// const Todos = require("../models/todos");

