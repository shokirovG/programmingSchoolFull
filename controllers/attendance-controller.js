const StudentsData = require("../models/Todos");

class StudentAttendance {
  async CheckAttendance(req, res) {
    try {
      const { name, group, courseName, lessonStartTime, lessonEndTime, checkInTime, checkOutTime } = req.body;

      // 1. students array ichidan name va group orqali topish
      const studentDoc = await StudentsData.findOne({ 'students.name': name, 'students.group': group });

      if (!studentDoc) {
        return res.status(404).json({ message: "Student topilmadi!" });
      }

      const student = studentDoc.students.find(stu => stu.name === name && stu.group === group);

      if (!student) {
        return res.status(404).json({ message: "Student document ichidan topilmadi!" });
      }

      let courseAttendance = student.attendance.find(att => att.courseName === courseName);

      if (courseAttendance) {
        // 4. Agar courseName bor bo'lsa, unga data push qilamiz
        courseAttendance.data.push({
          date: new Date(), 
          lessonStartTime,
          lessonEndTime,
          checkInTime,
          checkOutTime,
        });
      } else {
        student.attendance.push({
          courseName,
          data: [
            {
              date: new Date(),
              lessonStartTime,
              lessonEndTime,
              checkInTime,
              checkOutTime,
            }
          ]
        });
      }

      await studentDoc.save();

      res.status(200).json({ message: "Davomat saqlandi!" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Davomat tekshirishda server xatoligi!" });
    }
  }
}

module.exports = new StudentAttendance();
