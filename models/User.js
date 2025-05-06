const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true,"email unikalni bo'lishi shart"],
    required: [true,"email kiritishingiz shart!"],
    minLength:[5,"Email kamida 5harfdan iborat bo'lishi kerak"],
    lowercase:true
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
