const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');


const app = express();
const db  = require('./db.js');
const User = require('./models/userModel.js');

app.use(bodyParser.json())

app.post('/user', async(req,res)=>{
    try{
         const data = req.body ;
         const newUser = new User(data);
         const response = await newUser.save();
         console.log('data saved');
         res.status(201).json({response});
    }catch(err){
     console.error(err);
     res.status(500).json({
        error:"internal server Error"
     })
    }
});

app.get('/user',async(req,res)=>{
      try{
        const data = await User.find();
        console.log('data fetched');
        res.status(200).json({
            status:"success",
            result:data.length,
            data:data
        })
      }catch(err){
        console.error(err);
        res.status(500).json({
        error:"internal server Error"
     })
      }
})

app.listen(process.env.PORT,()=>{
    console.log("listening port on 3000");
})
