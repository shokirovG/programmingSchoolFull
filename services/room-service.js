const RoomModel = require("../models/Room");

class RoomService {
  async addRoom(room) {
    const findRoom = await RoomModel.findOne({ roomName: room.roomName });
    if (!findRoom) {
      const roomData = await RoomModel.create(room);
      return roomData;
    }
    return null;
  }
  async getRoom() {
    const findRooms = await RoomModel.find();
    return findRooms;
  }
}

module.exports = new RoomService();
