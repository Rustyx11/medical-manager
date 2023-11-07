const mongoose = require('mongoose')
const colors = require('colors')

const joinDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB sucess connected ${mongoose.connection.host}`.bgBlue.white);
    } catch (error) {
        console.log(`MongoDB server error ${error}`.bgRed.white);
    }
};

module.exports = joinDB;