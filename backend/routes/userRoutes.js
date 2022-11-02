const express = require("express");
const {
  registration,
  login,
  allUser,
} = require("../controller/user.controller");
const router = express.Router();
const { authenticate } = require("../middleware/authentication");
router.route("/signup").post(registration);
router.post("/login", login);
router.get("/", authenticate,allUser);
module.exports = router;
