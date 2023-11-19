const express = require("express");
const uAuthorization = require("../middlewares/uAuthorization");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
} = require("../controllers/dController");
const router = express.Router();

//POST Informacje o doktorze
router.post("/getDoctorInfo", uAuthorization, getDoctorInfoController);

//POST aktualizacja profilu doktora
router.post("/updateProfile", uAuthorization, updateProfileController);

//POST pojedyncza informacja o doktorze
router.post("/getDoctorById", uAuthorization, getDoctorByIdController);

module.exports = router;
