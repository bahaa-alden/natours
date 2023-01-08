import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    result: users.length,
    data: users,
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  //If the user use update me should not send pass cause this route for normal work like update name,email... not auth
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        400,
        'This route is not for updates password. Please use /updateMyPassword to update password'
      )
    );
  const filteredBody = filterObj(req.body, 'name', 'email');
  const user = await User.findOneAndUpdate(
    req.user.id,
    filteredBody,
    { new: true, runValidators: true }
    //run validator for normal like minlength or enum but not required
  );
  res.status(200).json({ status: 'success', data: { user } });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
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
