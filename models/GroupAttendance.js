const mongoose = require("mongoose");


const lessonSchema = new mongoose.Schema({
  lessonDate: {
    type: String,
    required: true,
  },
  isCome: {
    type: String,
    enum: ["true", "false"],
    required: true,
  }
}, { _id: false });

// Asosiy schema: har bir group uchun attendance yozuvi
const groupAttendanceSchema = new mongoose.Schema({
  groupname: {
    type: String,
    required: true,
  },
  date: [lessonSchema]
});

const GroupAttendance = mongoose.model("GroupAttendance", groupAttendanceSchema);

module.exports = GroupAttendance;
