const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "nazwa użytkownika jest wymagana"],
  },
  email: {
    type: String,
    require: [true, "adres Email jest wymagany"],
  },
  password: {
    type: String,
    require: [true, "haslo jest wymagane"],
  },
  admin: {
    type: Boolean,
    default: false,
  },
  doctor: {
    type: Boolean,
    default: true,
  },
  notification: {
    type: Array,
    default: [],
  },
  shownotification: {
    type: Array,
    default: [],
  },

  verfication: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
