import crypto from 'crypto';
import Tour from '../models/tourModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import User from '../models/userModel.js';
import Booking from '../models/bookingModel.js';

export const getOverview = catchAsync(async (req, res, next) => {
  //1)Get tour data from Tour collection
  const tours = await Tour.find();
  //2)Build the overview page
  //3)Render overview page using the tour data
  res.status(200).render('overview', { title: 'All tours', tours });
});

export const getTour = catchAsync(async (req, res, next) => {
  //virtual fields from another doc do not show up without populate (reviews)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  if (!tour) return next(new AppError(404, 'There is no tour with that name'));
  res.status(200).render('tour', { title: `${tour.name} Tour`, tour });
});

export const getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
    url: ` ${req.protocol}://${req.get('host')}/forgotPassword`,
  });
});

export const getSignupForm = catchAsync(async (req, res) => {
  res.status(200).render('signup', { title: 'Create your account' });
});

export const getMe = catchAsync(async (req, res, next) => {
  res.status(200).render('account', { title: 'My Account' });
});

export const getForgotPasswordForm = catchAsync(async (req, res, next) => {
  res.status(200).render('forgotPassword', { title: 'Forgot Password' });
});

export const getResetPasswordForm = catchAsync(async (req, res, next) => {
  const hashToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError(404, 'Invalid url, Please go to the home page'));
  }
  res.status(200).render('resetPassword', {
    title: 'Reset Password',
    token: req.params.token,
  });
});

export const getMyBookings = catchAsync(async (req, res, next) => {
  //1) Get user's bookings
  const booking = await Booking.find({ user: req.user.id });

  //2) Get the tour that the user had booked
  const tourIds = booking.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });
  res.status(200).render('overview', { title: 'My tours', tours });
});

export const alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    req.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking does't show up here immediately, please come back later.";
  next();
};
