const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv');
const joinDB = require('./config/db');


//dotenv config
dotenv.config();

//Połączenie do MongoDB
joinDB();

// reszta obiektu
const app = express()

// srodek naszego obiektu
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/user', require("./routes/uRoutes"));

//Port
const port = process.env.PORT || 8080
//Port nasłuchowy
app.listen(port, () =>{
    console.log(`Serwer Pracuje w ${process.env.NODE_MODE} na porcie ${process.env.PORT}`.bgCyan.white);
});