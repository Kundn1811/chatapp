const express = require("express");
const { authenticate } = require("../middleware/authentication");
const router = express.Router();
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controller/chat.controller");

router.route("/").post(authenticate, accessChat);
router.route("/").get(authenticate, fetchChats);
router.route("/group").post(authenticate, createGroupChat);
router.route("/rename").put(authenticate, renameGroup);
router.route("/groupremove").put(authenticate, removeFromGroup);
router.route("/groupadd").put(authenticate, addToGroup);

module.exports = router;
