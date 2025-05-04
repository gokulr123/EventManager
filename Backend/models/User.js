const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ustId: { type: String, required: true, unique: true },
  userName: {type:String,required:true},
  password: { type: String, required: true },
  isAdmin: {type:Boolean,default:false},
  gender: String,
  gmail: String,
  dateOfBirth: String
});

module.exports = mongoose.model('User', userSchema);
