const checkService = require("../services/check-service");

class CheckController {
  printCheck(req, res, next) {
    try {
      const check = req.body;
      const checkData = checkService.printCheck(check);
      return res.json(checkData);
    } catch (error) {
      console.log(error);
    }
    next();
  }
}

module.exports = new CheckController();
