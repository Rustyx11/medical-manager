const mongoose = require("mongoose");

const documentationSchema = new mongoose.Schema({
  docID: {
    type: String,
  },

  Gender: {
    type: String,
    require: [true, "Płeć jest wymagana"],
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

  height: {
    type: String,
    require: [true, "Podaj Wzrost pacjenta"],
  },

  weight: {
    type: String,
    require: [true, "Podaj Wagę pacjenta"],
  },

  historydiseases: {
    type: String,
    require: [true, "historia chorób jest wymagana"],
  },

  currentconditions: {
    type: String,
    require: [true, "Podaj aktualne schorzenia"],
  },

  smoking: {
    type: Boolean,
    require: [true, "Podaj czy pacjent pali"],
  },

  alcohol: {
    type: Boolean,
    require: [true, "Podaj czy pacjent spożywa alkohol"],
  },

  drugs: {
    type: Boolean,
    require: [true, "Podaj czy pacjent bierze narkotyki"],
  },
});

const documentationModel = mongoose.model("doctors", doctorSchema);
module.exports = documentation;
