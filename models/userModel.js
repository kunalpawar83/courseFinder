const  mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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

userSc.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')){
      return next();
    }
    try{
      const salt  = await bcrypt.genSalt(9);

      const hashedPassword = await bcrypt.hash(user.password,salt);

      user.password = hashedPassword;
      // Delete passwordConfirm field
      this.passwordConfirm = undefined;
      next();
    }catch(err){
          return next(err)
    }
  
});

userSc.methods.comparePassword = async function(candidatePassword){
   try{
         const isMatch = await bcrypt.compare(candidatePassword,this.password)
         return isMatch;
   }catch(err){
    throw err;
   }
}

const User = mongoose.model('User',userSc);
module.exports =User;