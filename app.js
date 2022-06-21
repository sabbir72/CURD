require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const users = require("./models/userSchema");
const cors = require("cors");
const path = require('path')
const router = require("./routes/router");

const port = process.env.PORT || 8003;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.json("server start")
})
// config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({
        path:".env"
 })}

 app.use(express.static(path.join(__dirname,"./client/build")));

app.get("*",(req,res) =>{
    res.sendFile(path.resolve(__dirname,"./client/build/index.html"));
})
app.use(router);

app.listen(port, () => {
    console.log(`server is start port number ${port}`);
});