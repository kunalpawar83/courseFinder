const express = require('express');
const bodyparser = require('body-parser');
require('dotenv').config();


const User = require('./models/userModel.js');


const app = express();
app.use(bodyparser.json());
const PORT =  process.env.PORT || 3000;

app.get('/api/v1/user',(req,res)=>{
    const userdata =  User.find();
    res.json(userdata);
})

app.post('/api/v1/user',(req,res)=>{
    const data = User.create(req.body);

    res.status(201).json({
        Message:"success"
    })
})

app.listen(PORT ,()=>{
    console.log('listening on port'+PORT);
})

