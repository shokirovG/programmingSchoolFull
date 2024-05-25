const mongoose = require("mongoose");

const eskiOySchema = new mongoose.Schema({
  month: String,
  totalPriceNaqd: Number,
  totalPriceClick: Number,
});

const EskiOy = mongoose.model("eskiOy", eskiOySchema);

module.exports = EskiOy;
