const express = require("express");
const {
  loginController,
  registerController,
  uController,
  adController,
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

module.exports = router;
