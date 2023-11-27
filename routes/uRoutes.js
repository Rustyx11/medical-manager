const express = require("express");
const {
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
} = require("../controllers/uController");
const uAuthorization = require("../middlewares/uAuthorization");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Authorization || POST
router.post("/getUData", uAuthorization, uController);

//Dodawanie Doktora || POST
router.post("/add-doctor", uAuthorization, adController);

//Powiadomienia Doktora || POST
router.post("/notification", uAuthorization, getnotification);

//Powiadomienia Doktora || POST
router.post("/delete-notification", uAuthorization, deletenotification);

//GET Wszyscy doktorzy
router.get("/getAllDoctors", uAuthorization, getAllDoctorsController);

//Rezerwowanie Wizyty
router.post("/reservation", uAuthorization, reservationController);

//Sprawdzanie rezerwacji
router.post("/check-reservation", uAuthorization, checkReservationController);

//Lista Wizyt
router.get("/user-visit", uAuthorization, userVisitController);

module.exports = router;
