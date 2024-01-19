const documentationModel = require("../models/docModel");

/*{const getDocumentationInfoController = async (req, res) => {
  try {
    const documentation = await documentationModel.findOne({
      docID: req.body.docID,
    });
    res.status(200).send({
      sucess: true,
      message: "Przesył danych o dokumentacji zakończony pomyślnie",
      data: documentation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      error,
      message: "Błąd w przesyle informacji o dokumentacji",
    });
  }
};}*/
const getDocumentationInfoController = async (req, res) => {
  const { id } = req.params;

  const ApprenticeshipsDates = await documentationModel.findOne({chip:id});

  if (!ApprenticeshipsDates) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).send({
    success: true,
    message: "Przesył danych o doktorze zakończony pomyślnie",
    data: ApprenticeshipsDates,
  });
};

/*{const updateDocumentationController = async (req, res) => {
  try {
    const documentation = await documentationModel.findByIdAndUpdate(
      { docID: req.body.docID },
      req.body
    );
    res.status(200).send({
      sucess: true,
      message: "Dokumentacja została zaktualizowana",
      data: documentation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Błąd przy aktualizowaniu dokumentacji",
    });
  }
};}*/

const updateDocumentationController = async (req, res) => {
  const { _id, ...updateData } = req.body;
  const { id } = req.params;
  const ApprenticeshipsDates = await documentationModel.findByIdAndUpdate(id, updateData);

  if (!ApprenticeshipsDates) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(ApprenticeshipsDates);
};

const getDocumentationByIdController = async (req, res) => {
  try {
    const documentation = documentationModel.findOne({ _id: req.body.docID });
    res.status(200).send({
      sucess: true,
      message: "Informacje o danej dokumentacji przesłano pomyślnie",
      data: documentation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      error,
      message: "Błąd w przesyle informacji o danej dokumnetacji",
    });
  }
};

module.exports = {
  getDocumentationInfoController,
  updateDocumentationController,
  getDocumentationByIdController,
};
