const uModel = require("../models/uModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/uModel");
const doctorModel = require("../models/dModel");
const appointmentModel = require("../models/aModel");
const moment = require("moment");

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

const getnotification = async (req, res) => {
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

//Usuwanie Powiadomień
const deletenotification = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.Iduser });
    user.notification = [];
    user.shownotification = [];
    const updateUser = await user.save();
    updateUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Powiadomenia zostały pomyślnie usunięte",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Wystąpił błąd podczas usuwania powiadomień",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "pending" });
    res.status(200).send({
      success: true,
      message: "Lista doktorów pomyślnie załadowana",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Błąd w pobieraniu listy doktorów",
    });
  }
};

const reservationController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.date = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.Iduser });
    user.notification.push({
      type: "New-reservation",
      message: `Nowe zgłoszenie rezerwacji od ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Pomyślnie zgłoszono wizytę",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Błąd przy rezezerwowaniu wizyty",
    });
  }
};

const checkReservationController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const atTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: atTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Wizyta nie dostępna w tym zakresie czasu",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Wizyta pomyślnie zarezerwowana",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Błąd przy rezerwacji",
    });
  }
};

const userVisitController = async (req, res) => {
  try {
    const visits = await appointmentModel.find({ Iduser: req.body.Iduser });
    res.status(200).send({
      success: true,
      message: "Pomyślnie wczytano wizyty użytkownika",
      data: visits,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Błąd w wizytyach użytkownika",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  uController,
  adController,
  getnotification,
  deletenotification,
  getAllDoctorsController,
  reservationController,
  checkReservationController,
  userVisitController,
};
