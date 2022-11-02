const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controller/message.controller");

const { authenticate } = require("../middleware/authentication");
const router = express.Router();

router.route("/:chatId").get(authenticate, allMessages);
router.route("/").post(authenticate, sendMessage);

module.exports = router;
