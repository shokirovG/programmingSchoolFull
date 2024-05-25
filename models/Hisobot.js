const mongoose = require("mongoose");
const { v4 } = require("uuid");
const hisobotSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  hisoblar: [
    {
      kun: {
        type: String,
      },
      hisobot: {
        kirim: {
          type: Array,
        },
        chiqim: {
          type: Array,
        },
        id: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: new Date(),
        },
      },
      balansNaqd: {
        type: Number,
      },
      balansClick: {
        type: Number,
      },
    },
  ],
});

const Hisobot = mongoose.model("hisobot", hisobotSchema);

module.exports = Hisobot;
