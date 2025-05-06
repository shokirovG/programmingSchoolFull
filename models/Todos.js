const mongoose = require("mongoose");

const courseAttendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  lessonStartTime: { type: String, required: true },
  lessonEndTime: { type: String, required: true },
  checkInTime: { type: Date },
  checkOutTime: { type: Date }
}, { _id: false });


const todosSchema = new mongoose.Schema({
  month: {
    type: String,
    require: true,
    unique: true,
  },
  students: [
    {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      group: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      foiz: Number,
      department: {
        type: String,
        required: true,
      },
      telNumber: {
        type: String,
       
      },
      created: {
        type: Date,
        default: new Date(),
      },
      priceDate: {
        type: Date,
        default: new Date(),
      },
      attendance:[
       {
        courseName:{type:String,required:[true,"Kurs nomi tanlanishi kerak!"]},
        data:[courseAttendanceSchema]
       }
      ]
     
    },
  ],
});

const Todos = mongoose.model("todos", todosSchema);

module.exports = Todos;
