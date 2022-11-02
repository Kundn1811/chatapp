const asyncHandler = require("express-async-handler");
const chatModel = require("../model/chat.model");
const userModel = require("../model/user.model");



const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await chatModel
    .find({
      $and: [
        { communicators: { $elemMatch: { $eq: req.user._id } } },
        { communicators: { $elemMatch: { $eq: userId } } },
      ],
    })
    .populate("communicators", "-password")
    .populate("recentMessage");

  isChat = await userModel.populate(isChat, {
    path: "recentMessage.sender",
    select: "name image email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chat: "sender",
      communicators: [req.user._id, userId],
    };

    try {
      const createdChat = await chatModel.create(chatData);
      const FullChat = await chatModel
        .findOne({ _id: createdChat._id })
        .populate("communicators", "-password");
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    chatModel
      .find({ communicators: { $elemMatch: { $eq: req.user._id } } })
      .populate("communicators", "-password")
      .populate("recentMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await userModel.populate(results, {
          path: "recentMessage.sender",
          select: "name image email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { accessChat, fetchChats };