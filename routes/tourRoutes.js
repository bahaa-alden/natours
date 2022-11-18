const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
router.param('id', tourController.cheackId);

/*
NOTE  when we use middleware route we send with him the direct path and inside
NOTE  the route we dont need to write the url another time caues in father
NOTE  app we use the route and send the url with and inside the route we deal with him like a fathr*/
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.cheakBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
