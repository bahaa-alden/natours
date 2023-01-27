import Review from '../models/reviewModel.js';
// import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const getALlReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find().sort('+createdAt');
  res
    .status(200)
    .json({ status: 'success', results: reviews.length, data: { reviews } });
});

export const createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);
  res.status(201).json({ status: 'success', date: { review: newReview } });
});

export const getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  res.status(200).json({ status: 'success', data: { review } });
});
