const { default: kursModel } = require("../models/Kurs");
const kursService = require("../services/kurs-service");

class kursController {
  async addKurs(req, res, next) {
    try {
      const { kursName, kursPrice, month } = req.body;
      const kursData = await kursService.addKurs(kursName, kursPrice, month);
      return res.json(kursData);
    } catch (error) {
      console.log(error);
    }
    next();
  }
  async allKurses(req, res, next) {
    try {
      const { month } = req.body;
      const kurses = await kursService.getKurses(month);
      return res.json(kurses);
    } catch (error) {
      console.log(error);
    }
    next();
  }
  async removeKurs(req, res, next) {
    const { id } = req.params;
    console.log(id);
    try {
      const kursRemove = await kursService.removeKurs(id);
      return res.json(kursRemove);
    } catch (error) {
      console.log(error);
    }
    next();
  }
  async updateKurs(req, res, next) {
    const { updateKurs } = req.body;

    try {
      const kurs = await kursService.updateKurs(updateKurs);
      return res.json(kurs);
    } catch (error) {
      console.log(error);
    }
    next();
  }
}

module.exports = new kursController();
