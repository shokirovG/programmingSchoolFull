const roomService = require("../services/room-service");

class RoomController {
  async addRoom(req, res, next) {
    try {
      const room = req.body;
      const roomData = await roomService.addRoom(room);
      return res.json(roomData);
    } catch (error) {
      console.log(error);
    }
    next();
  }
  async getRooms (req,res,next) {
    try {
        const roomData = await roomService.getRoom()
        return res.json(roomData)
    } catch (error) {
      console.log(error);
    }
  }
  async removeRoom () {
    try {
      
    } catch (error) {
          console.log(error);
    }
  }
}
module.exports = new RoomController();
