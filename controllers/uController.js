const uModel = require("../models/uModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/uModel");

//proces rejestracji
const registerController = async (req, res) => {
  try {
    const ifthereuser = await uModel.findOne({ email: req.body.email });
    if (ifthereuser) {
      return res.status(200).send({
        message: "Użytkownik o podanym adresie email istnieje",
        success: false,
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordhashed = await bcrypt.hash(password, salt);
    req.body.password = passwordhashed;
    const nUser = new uModel(req.body);
    await nUser.save();
    res
      .status(201)
      .send({ message: "Zarejestrowano pomyślnie", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Kontroler Rejestracji ${error.message}`,
    });
  }
};

//proces logowania
const loginController = async (req, res) => {
  try {
    const user = await uModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: `Nie znaleziono użytkownia`, success: false });
    }
    const correct = await bcrypt.compare(req.body.password, user.password);
    if (!correct) {
      return res
        .status(200)
        .send({ message: `Podany mail lub hasło są błędne!`, success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .send({ message: "Zalogowany pomyślnie!", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Błąd podczas logowania` });
  }
};

const uController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.Iduser });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "Nie znaleziono użytkownikaaaaaaa",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Autoryzacja nie poprawna",
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController, uController };
