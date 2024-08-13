const mongoose = require("mongoose");

const markazSchema = new mongoose.Schema({
  LCName: {
    type: String,
    require: true,
  },
});

const Markaz = mongoose.model("Markaz", markazSchema);

module.exports = Markaz;
