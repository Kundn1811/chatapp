const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.mongo_url;
// const connection = mongoose.connect(url);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
