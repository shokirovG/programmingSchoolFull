const markazService = require("../services/markaz-service");

class MarkazController {
  async setMarkazName(req, res, next) {
    try {
      const { LCName } = req.body;
      console.log(LCName);
      const markazData = await markazService.setName(LCName);
      return res.json(markazData);
    } catch (error) {
      console.log(error);
    }
    next();
  }
  async getMarkazName(req, res, next) {
    try {
      const nameMarkaz = await markazService.getName();
      return res.json(nameMarkaz);
    } catch (error) {
      console.log(error);
    }

    next();
  }
}

module.exports = new MarkazController();
