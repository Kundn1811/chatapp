const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../model/user.model");
const asyncHnadler = require("express-async-handler");

const authenticate = asyncHnadler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.key);
      req.user = await userModel.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not autherized, no token");
  }
});

module.exports = { authenticate };
