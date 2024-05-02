const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  email: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
});

const Register = mongoose.model("Register", registerSchema);

module.exports = Register;
