const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      default: 'Anonymous'
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;

