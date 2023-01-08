import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import APIFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    result: users.length,
    data: users,
  });
});
export const createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).send({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    //BUG and mongoose don't see it and i have to solve it manually
    //i use return to end the request and avoid send the next response
    return next(new AppError(404, 'No user with that ID'));
  }
  res.status(200).send({
    status: 'success',
    data: {
      user,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError(404, 'a user not found'));
  }
  res.status(200).send({
    status: 'success',
    data: {
      user,
    },
  });
});

//NOTE delete user
export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) {
    return next(new AppError(404, 'a user not found'));
  }

  res.status(204).send({ status: 'success', data: null });
});
