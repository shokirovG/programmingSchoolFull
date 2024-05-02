const mongoose = require("mongoose");

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
      created: {
        type: Date,
        default: new Date(),
      },
      priceDate: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

const Todos = mongoose.model("todos", todosSchema);

module.exports = Todos;
