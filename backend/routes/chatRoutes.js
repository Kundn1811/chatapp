const express = require("express");
const {authenticate} = require("../middleware/authentication")
const router = express.Router();
const { accessChat, fetchChats } = require("../controller/chat.controller");
router.route("/").post(authenticate, accessChat);
router.route("/").get(authenticate,fetchChats);
module.exports = router