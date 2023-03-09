import { Router } from 'express';
import { isLoggedIn } from '../controllers/authController.js';
import {
  getOverview,
  getTour,
  getLoginForm,
  getSignupForm,
  getMe,
} from '../controllers/viewController.js';

const router = Router();

router.use(isLoggedIn);

router.get('/', getOverview);

router.get('/tour/:slug', getTour);

router.get('/login', getLoginForm);

router.get('/signup', getSignupForm);

router.get('/me', getMe);
export default router;
