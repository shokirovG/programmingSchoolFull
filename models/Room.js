const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
});

const RoomModel = mongoose.model("room", roomSchema);

module.exports = RoomModel;
