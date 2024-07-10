const express = require("express");
require("dotenv").config();


const app = express();
const Port = process.env.PORT || 3002;

app.get('/',(req,res)=>{
    res.send('welcome');
})

app.listen(Port, ()=>{
    console.log(`Server Started At ${Port}`)
})