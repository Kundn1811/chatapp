const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    message:{type:String,trim:true},
    chat:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"},
},
{
    timestamps:true,
});
// https://cdn-icons-png.flaticon.com/512/21/21104.png
const messageModel = mongoose.model("Message",messageSchema);

module.exports = messageModel;

