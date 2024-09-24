const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum:['user','admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: true,
  },

});


const User = mongoose.model('User', userSchema);
module.exports = User;