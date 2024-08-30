const mongoose = require("mongoose");

const markazSchema = new mongoose.Schema({
  LCName: {
    type: String,
    require: true,
  },
  logo: {
    type: String,
  },
});

const Markaz = mongoose.model("Markaz", markazSchema);

module.exports = Markaz;
