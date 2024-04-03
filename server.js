const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const db  = require('./db.js');
const User = require('./models/userModel.js');

app.use(bodyParser.json())


// ROUTES 
app.use('/user',require('./routes/userRoute.js'));
app.use('/course',require('./routes/courseRoute.js'));

app.listen(process.env.PORT,()=>{
    console.log("listening port on 3000");
})
