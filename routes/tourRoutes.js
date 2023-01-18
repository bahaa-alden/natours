import { Router } from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import {
  getTour,
  deleteTour,
  createTour,
  updateTour,
  getAllTours,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} from '../controllers/tourController.js';

const router = Router();
// router.param('id', tourController.checkId);
/*
NOTE  when we use middleware route we send with him the direct path and inside
NOTE  the route we don't need to write the url another time cause in father
NOTE  app we use the route and send the url with and inside the route we deal with him like a father*/
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/').get(protect, getAllTours).post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

export default router;
