import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
// import AppError from '../utils/appError.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);
  res.status(201).send({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});
export const login = catchAsync(async (req, res, next) => {
  //Check if  the email and password  exist
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError(400, 'Please provide password and email'));
  }
  //check if the user exist and the password correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(401, 'Incorrect password or email'));
  }

  const token = signToken(user._id);
  res.status(200).json({ status: 'success', token });
});

export const protect = catchAsync(async (req, res, next) => {
  // Getting a token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  //1) If the token not exist either the authorization found or not
  if (!token) {
    return next(
      new AppError(401, 'You are not logged in, please log in to get access.')
    );
  }
  //2) Verification token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decode);
  next();
});
