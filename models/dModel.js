const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    Name: {
      type: String,
      require: [true, "Imie jest wymagane"],
    },
    LastName: {
      type: String,
      require: [true, "Nazwisko jest wymagane"],
    },
    Phone: {
      type: String,
      require: [true, "Numer telefonu jest wymagany"],
    },
    Email: {
      type: String,
      require: [true, "Adres email jest wymagany"],
    },
    Address: {
      type: String,
      require: [true, "Adres zamieszkania jest wymagany"],
    },
    Specialization: {
      type: String,
      require: [true, "Specjalizacja lekarza jest wymagana."],
    },
    status: {
      type: String,
      default: "pending",
    },
    Time: {
      type: Object,
      require: [true, "Czas pracy lekarza."],
    },

  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
