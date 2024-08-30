const Markaz = require("../models/Markaz");

class MarkazService {
  async setName(LCName, logo) {
    const res = await Markaz.findOne({});
    if (res) {
      console.log(res);
      res.LCName = LCName;
      res.logo = logo;
      return res.save();
    } else {
      const markazData = await Markaz.create({ LCName, logo });
      return markazData;
    }
  }
  async getName() {
    const res = await Markaz.findOne({});
    return res;
  }
}

module.exports = new MarkazService();
