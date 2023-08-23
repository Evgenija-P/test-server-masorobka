const mongoose = require("mongoose");
require("dotenv").config();
const config = require("../../config/mongoConfig.json");

module.exports = mongoose
    .connect(process.env.DB_HOST)
    // .connect(`mongodb://${config.development.host}:${config.development.port}/${config.development.database}`)
    .then(() => {
        console.log("mongodb up");
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
