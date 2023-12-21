const doctorModel = require("../models/dModel");
const documentationModel = require("../models/docModel");
const userModel = require("../models/uModel");

const getAllEmployeeController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "Lista Pracowników",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Błąd podczas ładowania pracowników",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Lista doktorów",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Błąd podczas ładowania doktorów",
      error,
    });
  }
};

const getAllDocumentationsController = async (req, res) => {
  try {
    const documentations = await documentationModel.find({});
    res.status(200).send({
      success: true,
      message: "Lista Dokumentacji",
      data: documentations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Błąd podczas ładowania dokumentacji",
      error,
    });
  }
};

//Status konta doktora
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor._id });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-update",
      message: `Twoje konto doktora zostało ${status}`,
      onClickPath: "/notification",
    });
    user.doctor = status === "zatwiedzony" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Status konta zaktualizowana",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Błąd w statusie konta",
      error,
    });
  }
};

module.exports = {
  getAllDoctorsController,
  getAllEmployeeController,
  getAllDocumentationsController,
  changeAccountStatusController,
};
