const express = require("express");
const { urlencoded } = require("express");
const { configDotenv } = require("dotenv");
const router = express.Router();
const app = express();
const dotEnv = require("dotenv");
const cors = require("cors");
const Todos = require("./models/Todos");
const Hisobot = require("./models/Hisobot");
const Worker = require("./models/Worker");
const mongoose = require("mongoose");
const MajburiyCost = require("./models/MajburiyCost");
const EskiOy = require("./models/EskiOy");
const Table = require("./models/Table");
const { generateJWTToken } = require("./services/token");
const Register = require("./models/Register");
const cookieParser = require("cookie-parser");
dotEnv.config();
app.use(express.json());
app.use(
  cors({
    origin: process.env.URL_FRONT,
  })
);
app.use(cookieParser());
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
app.get("/auth", async (req, res) => {
  // const user = await Register.findOne({ email: req.body.email });
  const isAuth = req.cookies.token ? true : false;

  res.json({ isAuth });

  // const token = generateJWTToken(user._id);
  // res.cookie("token", token, { httpOnly: true, secure: true });
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
app.post("/students", async (req, res) => {
  const findItem = await Todos.find({ month: req.body.month });
  console.log(findItem, req.body.students);
  if (findItem.length !== 0) {
    await Todos.findOneAndUpdate(
      { month: req.body.month },
      { month: req.body.month, students: req.body.students }
    );
  } else {
    await Todos.create({ month: req.body.month, students: req.body.students });
  }

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
app.post("/monthprice", async (req, res) => {
  const findItem = await EskiOy.find({ month: req.body.month });
  console.log(findItem);
  if (findItem.length > 0) {
    await EskiOy.findOneAndUpdate(
      {
        month: req.body.month,
      },
      {
        month: req.body.month,
        totalPrice: req.body.totalPrice,
      }
    );
  } else {
    await EskiOy.create({
      month: req.body.month,
      totalPriceNaqd: req.body.totalPriceNaqd,
      totalPriceClick: req.body.totalPriceClick,
    });
  }
  res.json({ name: "asdasd" });
});
app.get("/monthprice", async (req, res) => {
  const total = await EskiOy.find({});
  res.json({ totalPrice: total });
});
app.post("/workers", async (req, res) => {
  const findWorker = await Worker.find({ month: req.body.month });

  if (findWorker.length === 0) {
    await Worker.create({
      month: req.body.month,
      workers: req.body.workers,
    });
  } else {
    await Worker.findOneAndUpdate(
      { month: req.body.month },
      {
        month: req.body.month,
        workers: req.body.workers,
      }
    );
  }
  res.json({ post: "post" });
});
app.get("/workers", async (req, res) => {
  const workers = await Worker.find({});

  res.json({ workers });
});
app.get("/tables", async (req, res) => {
  const groups = await Table.find({});
  res.json({ groups });
});
app.post("/tables", async (req, res) => {
  const findTable = await Table.find({ month: req.body.month });
  if (findTable.length === 0) {
    await Table.create({ month: req.body.month, groups: req.body.groups });
  } else {
    await Table.findOneAndUpdate(
      { month: req.body.month },
      { month: req.body.month, groups: req.body.groups }
    );
  }
  res.json({ post: "table" });
});
app.use("/", (req, res) => {
  res.json({ name: "hello" });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(" port listen");
});
