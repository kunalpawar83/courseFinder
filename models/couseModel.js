const  mongoose = require('mongoose');


const couseSc = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide user name'],
        unique: true
    },
    category: {
      type: String,
      required: [true, 'Please provide your email'],
      enum: ['frontend', 'backend', 'fullstack', 'cloud', 'testing', 'scrum']
    },
    level:{
        type:String,
        enum: ['easy', 'normal', 'hard'],
        default: 'normal'
    },
    duration: {
        type:Number,
    } 

});

const Course = mongoose.model('Course',couseSc);
module.exports =Course;

