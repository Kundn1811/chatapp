const express = require("express");
const connection = require("./config/config");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoute = require("./routes/messageRoutes");
const path = require("path"); 
require("dotenv").config();

const cors = require("cors");
const connectDB = require("./config/config");
const app = express();

app.use(cors()); // to block the cors error
app.use(express.json()); // to accept the json data

connectDB()

app.get("/", (req, res) => {
 let options = {
   root: path.join(__dirname),
 };

 let fileName = "api.txt";
 res.sendFile(fileName, options, function (err) {
   if (err) {
     next(err);
   } else {
     console.log("Sent:", fileName);
   }
 });
});

app.use('/user',userRoutes)
app.use("/chat",chatRoutes)
app.use("/message",messageRoute)


/*---------------established Connection to mongodb--------------*/
const PORT = process.env.PORT || 8080;
const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);

const io = require('socket.io')(server,{
  pingTimeout:60000,
  cors:{
    origin:"http://localhost:3000",
  },
})

io.on("connection",(socket)=>{
  console.log("connected to socket.io");
  socket.on('setup',(userData)=>{
      socket.join(userData._id)
      // console.log(userData._id);
      socket.emit("connected");
  });

  socket.on("join chat",(room)=>{
    socket.join(room);
    console.log("user joined: "+room);
  })

  socket.on("new message", (newMessageRecieved)=>{
    var chat = newMessageRecieved.chat;

    if(!chat.users) return console.log("chat.users not defined");

    chat.users.forEach(user=>{
      if(user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    })
  })

})
// baseUrl :-  https://peaceful-sierra-38069.herokuapp.com