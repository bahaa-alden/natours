import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import { deleteOne, getAll, getOne, updateOne } from './handlerFactory.js';

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
export const updateMe = catchAsync(async (req, res, next) => {
  //If the user use update me should not send pass cause this route for normal work like update name,email... not auth
  //and if the front end developer thought this route for update password
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

export const getAllUsers = getAll(User);
export const getUser = getOne(User);
//Do not update password with this
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);
