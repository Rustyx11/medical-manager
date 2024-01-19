const uModel = require("../models/uModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/uModel");
const doctorModel = require("../models/dModel");
const appointmentModel = require("../models/aModel");
const documentationModel = require("../models/docModel");
const nodemailer = require("nodemailer");
const moment = require("moment");
const { default: mongoose } = require("mongoose");

//Proces weryfikacji
const sendVerificationEmailController = async (name, email, user_id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "szymonwieczorek011@gmail.com",
        pass: "ujvm vbtf kqvt ihqp ",
      },
    });

    const mailOptions = {
      from: "szymonwieczorek011@gmail.com",
      to: email,
      subject: "Verification mail",
      html:
        "<p>Witaj " +
        name +
        ' kliknij <a href="http://localhost:3000/verify/' +
        user_id +
        '">tutaj</a> aby zweryfikować konto</p>',
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email został wysłany:", info.response);
  } catch (error) {
    console.log("Błąd podczas wysyłania emaila:", error);
  }
};

const verifyEmailController = async (req, res) => {
  console.log("Cos");
  console.log(req.params);
  try {
    console.log("Próba weryfikacji, _id:", req.params.id);
    const updateStatus = await userModel.updateOne(
      { _id: req.params.id },
      { $set: { verification: 1 } }
    );

    console.log("Wynik aktualizacji:", updateStatus);

    const user = await userModel.findById(req.params.id);
    console.log("Stan weryfikacji po aktualizacji:", user.verification);

    res.redirect("verify");
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Błąd podczas weryfikacji: ${error.message}`,
    });
  }
};





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
    sendVerificationEmailController(req.body.name, req.body.email, nUser._id);
    res
      .status(201)
      .send({ message: "Zarejestrowano pomyślnie, zweryfkuje swój adres email", success: true });
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
    if (user.verification == 0) {
      return res
        .status(200)
        .send({ message: `Konto nie zostało zweryfikowane!`, success: false });
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
    const user = await userModel.findById(req.body._id);
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
    const newDoctor = await doctorModel({
      ...req.body,
      status: "pending",
      _id: new mongoose.Types.ObjectId(),
    });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ admin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "add-doctor-request",
      message: `${newDoctor.Name} ${newDoctor.LastName} został dodany jako doktor`,
      data: {
        doctorID: "newDoctor._id",
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

//Dodawanie dokumentacji
const addDocumentationController = async (req, res) => {
  try {
    const newDocumentation = await documentationModel({ ...req.body });
    await newDocumentation.save();
    const adminUser = await userModel.findOne({ admin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "add-documentation-request",
      message: `Dokumentacja ${newDocumentation.Name} ${newDocumentation.LastName} została dodana`,
      data: {
        doctorID: newDocumentation._id,
        name: newDocumentation.Name + " " + newDocumentation.LastName,
        onClickPath: "/admin/documentation",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Dokumentacja została dodana poprawnie",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Błąd podczas dodawania dokumentacji",
    });
  }
};

//Powiadomienia

const getnotification = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body._id });
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
    const user = await userModel.findOne({ _id: req.body._id });
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

const getAllDocumentationsController = async (req, res) => {
  try {
    const documentations = await documentationModel.find({});
    res.status(200).send({
      success: true,
      message: "Lista dokumentacji pomyślnie załadowana",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Błąd w pobieraniu listy dokumentacji",
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
    const user = await userModel.findOne({ _id: req.body.doctorInfo._id });
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
    const visits = await appointmentModel.findById(req.body._id);
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

//RFID
const handleRFIDRequest = async (req, res) => {
  try {
    const { uid } = req.body;
    const rfid = await uModel.findById('65a1659aaae6cbd0c7e601f7');
    console.log('Otrzymano UID z Raspberry Pi:', uid);
    rfid.RFID = uid;
    rfid.save();
    res.json({ success: true, message: 'Dane obsłużone pomyślnie' });
  } catch (error) {
    console.error('Błąd podczas obsługi żądania RFID:', error);
    res.status(500).send({ success: false, message: 'Błąd podczas obsługi żądania RFID' });
  }
};

const getRfidController = async (req, res) => {
  try {
    const rfid = await uModel.findById('65a1659aaae6cbd0c7e601f7');
    res.json({ success: true, rfid: rfid.RFID });
  } catch (error) {
    console.error('Błąd podczas obsługi żądania RFID:', error);
    res.status(500).send({ success: false, message: 'Błąd podczas obsługi żądania RFID' });
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
  getAllDocumentationsController,
  reservationController,
  checkReservationController,
  userVisitController,
  addDocumentationController,
  sendVerificationEmailController,
  verifyEmailController,
  handleRFIDRequest,
  getRfidController,
};
