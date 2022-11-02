const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    chat: { type: String, trim: true },
    communicators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    recentMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);
const chatModel = mongoose.model("Chat", chatSchema);
module.exports = chatModel;
