const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
   res.send("Initial api")
})


app.listen(8080,()=>{
    console.log("hosted on port no 8080")
})