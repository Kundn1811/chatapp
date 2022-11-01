const mongoose = require("mongoose");
require('dotenv').config();
const url = process.env.mongo_url;
const connection = mongoose.connect(url);

module.exports = connection;
