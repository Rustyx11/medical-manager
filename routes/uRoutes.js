const express = require("express");
const {
  loginController,
  registerController,
  uController,
  adController,
  getnotification,
  deletenotification,
  getAllDoctorsController,
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

module.exports = router;
