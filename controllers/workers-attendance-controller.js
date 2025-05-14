const mongoose = require("mongoose");
const Worker = require("../models/Worker"); // Modelni chaqirib olamiz

class AttendanceController {

  async addAttendance(req, res) {
    try {
      const { month, workerId } = req.body;

      // Oyni topamiz
      const workerData = await Worker.findOne({ month });

      if (!workerData) {
        return res.status(404).json({ message: "Bu oy topilmadi." });
      }

      // MongoDB _id bilan taqqoslash
      const worker = workerData.workers.find(w =>
        w._id.toString() === mongoose.Types.ObjectId(workerId).toString()
      );

      // Agar worker topilmasa, 404 xato statusi qaytaramiz
      if (!worker) {
        return res.status(404).json({ message: "Worker topilmadi." });
      }

      // Yangi attendance ma'lumoti
      const newAttendance = {
        date: new Date(),
        checkInTime: new Date(),
      };

      // Agar attendance bo'lmasa, yangi array yaratamiz
      if (!worker.attendance) {
        worker.attendance = [];
      }

      worker.attendance.push(newAttendance); // Attendance qo'shamiz

      // Bazaga saqlaymiz
      await workerData.save();

      // Muvaffaqiyatli javob
      res.status(200).json({ message: "Attendance muvaffaqiyatli qo'shildi!", worker });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Serverda xatolik yuz berdi." });
    }
  }
}

module.exports = new AttendanceController();
