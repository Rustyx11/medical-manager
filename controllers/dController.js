const doctorModel = require("../models/dModel");
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

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
};
