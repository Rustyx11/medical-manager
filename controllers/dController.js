const doctorModel = require("../models/dModel");
const appointmentModel = require("../models/aModel");
const userModel = require("../models/uModel");
const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ Iduser: req.body.Iduser });
    res.status(200).send({
      success: true,
      message: "Przesył danych o doktorze zakończony pomyślnie",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Błąd w przesyle informacji o doktorze",
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { Iduser: req.body.Iduser },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Profil doktora zaktualizowany",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Błąd przy aktualizowaniu profilu doktora",
    });
  }
};

const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Dane pojedynczego doktora pomyślnie przesłane",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Błąd w przesyle informacji o pojedynczym doktorze",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointmentsId.Iduser });
    user.notification.push({
      type: "status-updated",
      message: `Twój status został zaktualizowany ${status}`,
      onClickPath: "/doctor-visits",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Status wizyty zaktualizowany",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Błąd w aktualiazacji statusu",
    });
  }
};

const doctorVisitsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ Iduser: req.body.Iduser });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Wizyty doktora pomyślnie zapełnione",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Błąd w wizytach doktora",
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorVisitsController,
  updateStatusController,
};
