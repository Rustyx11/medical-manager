const express = require("express");
const uAuthorization = require("../middlewares/uAuthorization");
const {
  getAllEmployeeController,
  getAllDoctorsController,
  changeAccountStatusController,
} = require("../controllers/aController");

const router = express.Router();

//GET dla użytkownika
router.get("/getAllEmployee", uAuthorization, getAllEmployeeController);

//GET dla doktora
router.get("/getAllDoctors", uAuthorization, getAllDoctorsController);

//POST dla Statusu konta
router.post(
  "/changeAccountStatus",
  uAuthorization,
  changeAccountStatusController
);

module.exports = router;
