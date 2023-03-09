﻿import { Router } from 'express';
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updateMyPassword,
  restrictTo,
  logout,
} from '../controllers/authController.js';
import {
  getAllUsers,
  updateMe,
  deleteMe,
  getUser,
  deleteUser,
  updateUser,
  getMe,
} from '../controllers/userController.js';

const router = Router();
router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);

//Protect all routes after this middleware
router.use(protect);

router.route('/me').get(getMe, getUser);
router.route('/updateMyPassword').patch(updateMyPassword);
router.route('/updateMe').patch(updateMe);
router.route('/deleteMe').delete(deleteMe);

//All routes after this middleware are only for admin
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

export default router;
