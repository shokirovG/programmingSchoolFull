const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  month: String,
  workers: [
    {
      id: String,
      name: String,
      groups: Array,
      price: {
        type: Number,
        default: 0,
      },
      priceFoiz: {
        type: Number,
        default: 0,
      },
      priceType: {
        type: String,
        default: "o`zgarmas",
      },
      department: String,
    },
  ],
});

const Worker = mongoose.model("worker", workerSchema);

module.exports = Worker;
