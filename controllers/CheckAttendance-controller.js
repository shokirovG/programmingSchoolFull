// const Todos = require("../models/todos");

const updateIsCome = async (req, res) => {
  try { 
    const { month, studentId, lessonDate, isCome } = req.body;

    if (!month || !studentId || !lessonDate || !isCome) {
      return res.status(400).json({ message: "month, studentId, lessonDate va isCome kerak." });
    }

    const updatedDoc = await Todos.findOneAndUpdate(
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
