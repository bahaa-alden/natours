import { Router } from 'express';
import { isLoggedIn, protect } from '../controllers/authController.js';
import { createBookingCheckout } from '../controllers/bookingController.js';
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

router.use(isLoggedIn);
router.get('/health', async (req, res, next) => {
  res.status(200).send({ status: 'success' });
});
router.get('/', createBookingCheckout, getOverview);

router.get('/tour/:slug', getTour);

router.get('/login', getLoginForm);

router.get('/signup', getSignupForm);

router.get('/forgotPassword', getForgotPasswordForm);

router.get('/resetPassword/:token', getResetPasswordForm);

router.get('/me', protect, getMe);

router.get('/myBookings', protect, getMyBookings);

export default router;