import Tour from '../models/tourModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

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
  res.status(200).render('login', { title: 'Log into your account' });
});

export const getSignupForm = catchAsync(async (req, res) => {
  res.status(200).render('signup', { title: 'Create your account' });
});

export const getMe = catchAsync(async (req, res, next) => {
  res.status(200).render('account', { title: 'My Account' });
});
