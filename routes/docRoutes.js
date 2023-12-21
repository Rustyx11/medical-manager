const express = require("express");
const uAuthorization = require("../middlewares/uAuthorization");
const {
  getDocumentationInfoController,
  updateDocumentationController,
  getDocumentationByIdController,
} = require("../controllers/docController");
const router = express.Router();

//POST Informacje o doktorze
router.get(
  "/getDocumentationInfo/:id",
  uAuthorization,
  getDocumentationInfoController
);

//POST aktualizacja profilu doktora
router.patch(
  "/updateDocumentation/:id",
  uAuthorization,
  updateDocumentationController
);

//POST pojedyncza informacja o doktorze
router.post(
  "/getDocumentationById",
  uAuthorization,
  getDocumentationByIdController
);

module.exports = router;
