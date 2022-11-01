const express = require("express");
const connection = require("./config/config");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const cors = require("cors");
const app = express();

app.use(cors()); // to block the cors error
app.use(express.json()); // to accept the json data

app.get("/", (req, res) => {
  res.send("initial api");
});

app.use('/user',userRoutes)



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
