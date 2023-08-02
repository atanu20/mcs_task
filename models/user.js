const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    default:false
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const userTable = new mongoose.model('user', userScheme);
module.exports = userTable;
