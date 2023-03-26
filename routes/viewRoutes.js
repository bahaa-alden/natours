import { Router } from 'express';
import { isLoggedIn, protect } from '../controllers/authController.js';
import {
  getOverview,
  getTour,
  getLoginForm,
  getSignupForm,
  getMe,
  getForgotPasswordForm,
  getResetPasswordForm,
  getMyBookings,
} from '../controllers/viewController.js';

const router = Router();

router.get('/health', async (req, res, next) => {
  res.status(200).send({ status: 'success' });
});

router.use(isLoggedIn);

router.get('/', getOverview);

router.get('/tour/:slug', getTour);

router.get('/login', getLoginForm);

router.get('/signup', getSignupForm);

router.get('/forgotPassword', getForgotPasswordForm);

router.get('/resetPassword/:token', getResetPasswordForm);

router.get('/me', protect, getMe);

router.get('/myBookings', protect, getMyBookings);

export default router;
