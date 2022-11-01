const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/21/21104.png",
  },
},{timestamps:true});

const userModel = mongoose.model("User",userSchema)

module.exports = userModel;
