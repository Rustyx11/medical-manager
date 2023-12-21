const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_TOKEN, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Autoryzacja nie poprawna!",
          success: false,
        });
      } else {
        req.body._id = decode.id;
        next();
      }
    });
  } catch (error) {
    next();
    console.log(error);
    res.status(401).send({
      message: "Autoryzacja nie poprawna!",
      success: false,
    });
  }
};
