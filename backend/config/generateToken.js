const jwt = require("jsonwebtoken");

require("dotenv").config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.key, { expiresIn: "3d" });
};

module.exports = generateToken;
