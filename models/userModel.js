import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

// import AppError from '../utils/appError.js';
const { Schema, model } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'the password must have at least 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  //if the password not changed
  if (!this.isModified('password')) return next();

  //crypt the password
  this.password = await bcryptjs.hash(this.password, 12);

  //we are not need confirm password filed
  this.passwordConfirm = undefined;
  next();
});

//we did this operation in the model to apply the concept of fat model && fit controller
userSchema.methods.correctPassword = async (
  candidatePassword,
  userPassword
) => {
  //candidate password means the password with the body
  return await bcryptjs.compare(candidatePassword, userPassword);
};

const User = model('User', userSchema);

export default User;
