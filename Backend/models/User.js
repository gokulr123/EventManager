const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ustId: { type: String, required: true, unique: true },
  userName: {type:String,required:true},
  password: { type: String, required: true },
  gender: String,
  gmail: String,
  dateOfBirth: String
});

module.exports = mongoose.model('User', userSchema);
