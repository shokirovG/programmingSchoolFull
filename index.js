const express = require("express");
const { urlencoded } = require("express");
const { configDotenv } = require("dotenv");
const router = express.Router();
const app = express();
const dotEnv = require("dotenv");
const cors = require("cors");
const Todos = require("./models/Todos");
const Hisobot = require("./models/Hisobot");
const mongoose = require("mongoose");
const MajburiyCost = require("./models/MajburiyCost");
dotEnv.config();
app.use(express.json());
app.use(
  cors({
    origin: process.env.URL_FRONT,
  })
);
mongoose
  .connect(
    "mongodb+srv://muhammad:jVGUTNpQ9RPA7Shd@cluster0.k4oof.mongodb.net/"
  )
  .then(() => {
    console.log("bazaga ulandi...");
  })
  .catch((err) => console.log("baza ulanmadi!"));

// app.use(express.urlencoded({extended: true}))
app.get("/", (req, res) => {
  res.json({ todos: [1, 2, 3] });
});

app.post("/add", async (req, res) => {
  console.log("body:", req.body);
  const findMonth = await Todos.find({ month: req.body.month });
  if (findMonth.length !== 0) {
    await Todos.findOneAndUpdate(
      { month: req.body.month },
      {
        month: req.body.month,
        students: req.body.students,
      }
    );
  } else {
    await Todos.create({ month: req.body.month, students: req.body.students });
  }
  res.json({ name: "post" });
});

app.get("/students", async (req, res) => {
  const students = await Todos.find({});

  res.json({ students });
});
app.put("/students", async (req, res) => {
  await Todos.findOneAndUpdate(
    { month: req.body.month },
    { month: req.body.month, students: req.body.students }
  );
  res.json({ month: req.body.month, students: req.body.students });
});
app.get("/hisobot", async (req, res) => {
  const hisoblar = await Hisobot.find({});
  res.json({ hisoblar });
});
app.post("/hisobot", async (req, res) => {
  const findMonth = await Hisobot.find({ month: req.body.month });

  if (findMonth.length !== 0) {
    console.log("find topdi!", req.body.hisoblar);
    await Hisobot.findOneAndUpdate(
      { month: req.body.month },
      {
        month: req.body.month,
        hisoblar: req.body.hisoblar,
      }
    );
  } else {
    console.log("find topmadi");
    await Hisobot.create({
      month: req.body.month,
      hisoblar: req.body.hisoblar,
    });
  }

  res.json({ name: "post" });
});
app.get("/chiqimlar", async (req, res) => {
  const chiqimlar = await MajburiyCost.find({});
  res.json({ chiqimlar });
});

app.post("/chiqimlar", async (req, res) => {
  const findMonth = await MajburiyCost.find({ month: req.body.month });
  if (findMonth.length !== 0) {
    await MajburiyCost.findOneAndUpdate(
      { month: req.body.month },
      {
        month: req.body.month,
        chiqimlar: req.body.chiqimlar,
      }
    );
  } else {
    await MajburiyCost.create({
      month: req.body.month,
      chiqimlar: req.body.chiqimlar,
    });
  }
  res.json({ name: "asd" });
});
app.use("/", (req, res) => {
  res.send("hello school");
});
app.listen(5000, () => {
  console.log(" port listen");
});
