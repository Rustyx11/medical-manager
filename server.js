const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const joinDB = require("./config/db");
const cors = require("cors");
const rfidMiddleware = require("./middlewares/rfidMiddleware");
//dotenv config
dotenv.config();

//Połączenie do MongoDB
joinDB();

// reszta obiektu
const app = express();

// srodek naszego obiektu
app.use(express.json());
app.use(morgan("dev"));
var whitelist = [
  "http://localhost:8000",
  "http://localhost:8080",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3003",
]; //white list consumers
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "device-remember-token",
    "Access-Control-Allow-Origin",
    "Origin",
    "Accept",
  ],
};

app.use(cors(corsOptions));
// Dodaj middleware przed ścieżkami API
app.use(rfidMiddleware);

//routes
app.use("/api/v1/user", require("./routes/uRoutes"));
app.use("/api/v1/admin", require("./routes/aRoutes"));
app.use("/api/v1/doctor", require("./routes/dRoutes"));
app.use("/api/v1/documentation", require("./routes/docRoutes"));
//Port
const port = process.env.PORT || 8080;
//Port nasłuchowy
app.listen(port, () => {
  console.log(
    `Serwer Pracuje w ${process.env.NODE_MODE} na porcie ${process.env.PORT}`
      .bgCyan.white
  );
});
