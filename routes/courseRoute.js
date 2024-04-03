const express = require('express');
const Course = require('../models/couseModel.js');
const User = require('../models/userModel.js');

const router = express.Router();
router.get('/',async(req,res)=>{
    try{
      const data = await Course.find();
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

router.post('/:id', async(req,res)=>{
     const userData = await User.findById(req.params.id);
      console.log(userData.role);
     res.status(201).json({
         data:userData
     })
})

module.exports =router;






