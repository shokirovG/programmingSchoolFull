const mongoose = require("mongoose");

const majburiy = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  chiqimlar: [
    {
      type: Object,
    },
  ],
});

const MajburiyCost = mongoose.model("majburiy", majburiy);

module.exports = MajburiyCost;
