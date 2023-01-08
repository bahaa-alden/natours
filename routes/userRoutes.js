import { Router } from 'express';
import { signup, login, protect } from '../controllers/authController.js';
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = Router();
router.route('/signup').post(signup);
router.route('/login').post(login);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
export default router;
