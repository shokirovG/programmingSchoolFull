const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  month: String,
  groups: [],
});

const Table = mongoose.model("table", tableSchema);

module.exports = Table;
