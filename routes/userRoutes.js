import { Router } from 'express';
import csrf from 'csurf';
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
} from '../controllers/authController.js';
import {
  getAllUsers,
  updateMe,
  deleteMe,
} from '../controllers/userController.js';

const csrfProtection = csrf();
const router = Router();
router.route('/signup').post(csrfProtection, signup);
router.route('/login').post(csrfProtection, login);
router.route('/forgotPassword').post(csrfProtection, forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);
router.route('/updateMyPassword').patch(protect, updatePassword);
router.route('/updateMe').patch(protect, updateMe);
router.route('/deleteMe').delete(protect, deleteMe);

router.route('/').get(getAllUsers);
// router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
export default router;
