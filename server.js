const express = require('express');
const app = express();
require('dotenv').config();

const db  = require('./db.js');

app.get('/',(req,res)=>{
    res.send("kunal pawar");

});

app.listen(process.env.PORT,()=>{
    console.log("listening port on 3000");
})
