const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

//if we don't send the id, the middleware will not be called
router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody ,tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
