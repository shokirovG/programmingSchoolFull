const mongoose = require("mongoose");

const kursSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  kurses: [
    {
      kurs: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

const KursModel = mongoose.model("kurse", kursSchema);

module.exports = KursModel;
