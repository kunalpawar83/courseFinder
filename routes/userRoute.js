const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');

router.post('/Registration', async(req,res)=>{
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


router.get('/',async(req,res)=>{
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

router.put('/:id',async(req,res)=>{
    try{
       const userId  = req.params.id;
       const userData = req.body;
       
       const response = await User.findByIdAndUpdate(userId,userData,{
         new:true,
         runValidators:true
       })

       if(!response){
        return res.status(404).json({
            status:"fail",
            error:"User not found"
        })
       }

       console.log('data updated');
       res.status(200).json({
        status:"success",
        data:response
    })
    }catch(err){
      console.error(err);
      res.status(500).json({
      error:"internal server Error"
   })
    }
})

module.exports =router;
