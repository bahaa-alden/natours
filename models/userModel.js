﻿const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: true,
  },
});
const User = mongoose.model('User', userSchema);

module.exports = User;
