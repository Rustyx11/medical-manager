const express = require("express");
const uAuthorization = require("../middlewares/uAuthorization");
const {
  getAllEmployeeController,
  getAllDoctorsController,
  changeAccountStatusController,
  getAllDocumentationsController,
} = require("../controllers/aController");

const router = express.Router();

//GET dla użytkownika
router.get("/getAllEmployee", uAuthorization, getAllEmployeeController);

//GET dla doktora
router.get("/getAllDoctors", uAuthorization, getAllDoctorsController);

//GET dla dokumnetacji
router.get(
  "/getAllDocumentations",
  uAuthorization,
  getAllDocumentationsController
);

//POST dla Statusu konta
router.post(
  "/changeAccountStatus",
  uAuthorization,
  changeAccountStatusController
);

module.exports = router;
