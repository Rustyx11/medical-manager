const express = require("express");
const uAuthorization = require("../middlewares/uAuthorization");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorVisitsController,
  updateStatusController,
} = require("../controllers/dController");
const router = express.Router();

//POST Informacje o doktorze
//router.post("/getDoctorInfo", uAuthorization, getDoctorInfoController);
//GET Informacje o doktorze
router.get("/getDoctorInfo/:id", uAuthorization, getDoctorInfoController);

//POST aktualizacja profilu doktora
router.patch("/updateProfile/:id", uAuthorization, updateProfileController);

//POST pojedyncza informacja o doktorze
router.post("/getDoctorById", uAuthorization, getDoctorByIdController);

//GET wizyty doktora
router.get("/doctor-visits", uAuthorization, doctorVisitsController);

//POST Aktualizacja Statusu
router.post("/update-status", uAuthorization, updateStatusController);

module.exports = router;
