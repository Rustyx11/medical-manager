const uModel = require("../models/uModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/uModel");
const doctorModel = require("../models/dModel");

//proces rejestracji
const registerController = async (req, res) => {
  try {
    const ifthereuser = await uModel.findOne({ email: req.body.email });
    if (ifthereuser) {
      return res.status(200).send({
        message: "Użytkownik o podanym adresie email istnieje",
        success: false,
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordhashed = await bcrypt.hash(password, salt);
    req.body.password = passwordhashed;
    const nUser = new uModel(req.body);
    await nUser.save();
    res
      .status(201)
      .send({ message: "Zarejestrowano pomyślnie", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Kontroler Rejestracji ${error.message}`,
    });
  }
};

//proces logowania
const loginController = async (req, res) => {
  try {
    const user = await uModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: `Nie znaleziono użytkownia`, success: false });
    }
    const correct = await bcrypt.compare(req.body.password, user.password);
    if (!correct) {
      return res
        .status(200)
        .send({ message: `Podany mail lub hasło są błędne!`, success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .send({ message: "Zalogowany pomyślnie!", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Błąd podczas logowania` });
  }
};

const uController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.Iduser });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "Nie znaleziono użytkownika",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Autoryzacja nie poprawna",
      success: false,
      error,
    });
  }
};

//Proces dodawania doktorów

const adController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ admin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "add-doctor-request",
      message: `${newDoctor.Name} ${newDoctor.LastName} został dodany jako doktor`,
      data: {
        doctorID: newDoctor._id,
        name: newDoctor.Name + " " + newDoctor.LastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doktor został dodany poprawnie",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Błąd podczas dodawania doktora",
    });
  }
};

//Powiadomienia

const notification = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.Iduser });
    const shownotification = user.shownotification;
    const notification = user.notification;
    shownotification.push(...notification);
    user.notification = [];
    user.shownotification = notification;
    const updateUser = await user.save();
    res.status(200).send({
      success: true,
      message: "Wszystkie powiadomenia zostały odczytane",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Wysąpił błąd w powiadomieniach",
      success: false,
      error,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  uController,
  adController,
  notification,
};
