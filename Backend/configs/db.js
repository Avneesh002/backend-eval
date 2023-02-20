const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

const connection = mongoose.connect(process.env.SERVER_LINK);

module.exports = { connection };
