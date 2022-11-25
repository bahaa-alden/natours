import { Router } from 'express';
import {
  getTour,
  deleteTour,
  createTour,
  updateTour,
  getAllTours,
} from '../controllers/tourController.js';

const router = Router();
// router.param('id', tourController.cheackId);
/*
NOTE  when we use middleware route we send with him the direct path and inside
NOTE  the route we dont need to write the url another time caues in father
NOTE  app we use the route and send the url with and inside the route we deal with him like a fathr*/
router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
