import { Router } from 'express';
import {
  createReview,
  getALlReviews,
  getReview,
} from '../controllers/reviewController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = Router();
router
  .route('/')
  .get(getALlReviews)
  .post(protect, restrictTo('user'), createReview);
router.route('/:id').get(getReview);

export default router;
