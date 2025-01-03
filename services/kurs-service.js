const { default: mongoose } = require("mongoose");
const KursModel = require("../models/Kurs");

class KursService {
  async addKurs(kursName, kursPrice, month) {
    const kursData = await KursModel.findOne({ month });
    if (kursData) {
      kursData.kurses = [
        ...kursData.kurses,
        {
          kurs: kursName,
          price: kursPrice,
        },
      ];
      kursData.save();
      return kursData;
    }
    await KursModel.create({
      month,
      kurses: [
        {
          kurs: kursName,
          price: kursPrice,
        },
      ],
    });
    return kursData;
  }
  async getKurses(month) {
    const kurses = await KursModel.findOne({ month });
    return kurses;
  }
  async removeKurs(id) {
    const kurs = await KursModel.findOne({
      "kurses._id": new mongoose.Types.ObjectId(id),
    });
    const filterKurs = kurs.kurses.filter((el) => el._id.toString() !== id);
    kurs.kurses = filterKurs;
    kurs.save();

    return kurs;
  }
  async updateKurs(newKurs) {
    const kurs = await KursModel.findOne({
      "kurses._id": new mongoose.Types.ObjectId(newKurs._id),
    });
    const kursData = kurs.kurses.map((el) => {
      if (el._id.toString() === newKurs._id) {
        console.log("topdi", el);
        return {
          ...el,
          kurs: newKurs.kurs,
          price: newKurs.price,
        };
      } else {
        return el;
      }
    });
    kurs.kurses = kursData;
    kurs.save();
    return kurs;
  }
  async setKurses({ month, kurses }) {
   const data =  await KursModel.create({
      month,
      kurses,
    });
    return data
  }
}

module.exports = new KursService();
