const express = require("express");
const connection = require("./config/config");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoute = require("./routes/messageRoutes");
const path = require("path"); 
require("dotenv").config();

const cors = require("cors");
const app = express();

app.use(cors()); // to block the cors error
app.use(express.json()); // to accept the json data

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
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to mongodb");
    console.log("listning at 8080");
  } catch (err) {
    console.log("Connection not established");
  }
});


// baseUrl :-  https://peaceful-sierra-38069.herokuapp.com