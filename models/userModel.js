const  mongoose = require('mongoose');
const validator = require('validator');

const userSc = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide user name']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    role:{
        type:String,
        enum: ['user', 'superAdmin'],
        default: 'user'
    },
    password:{
        type:String,
        required:[true,'Please provide a password']
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          // This only works on CREATE and SAVE!!!
          validator: function(el) {
            return el === this.password;
          },
          message: 'Passwords are not the same!'
        }
      },
});


const User = mongoose.model('User',userSc);
module.exports =User;