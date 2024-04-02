const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');


const app = express();
const db  = require('./db.js');


app.use(bodyParser.json())


// ROUTES 
app.use('/user',require('./routes/userRoute.js'));

app.listen(process.env.PORT,()=>{
    console.log("listening port on 3000");
})
