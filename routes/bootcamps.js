const express = require("express");
const router = express.Router();
const {
  getBootcamp, 
  getBootcamps, 
  updateBootcamp, 
  deleteBootcamp,
  createBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require('../controllers/bootcamps')

const Bootcamp = require('../models/Bootcamp')

// Bringing in the required middleware functions
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Include other resource router
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

// Re-route into other resource routers
router.use('/:bootcampId/courses',courseRouter)
router.use('/:bootcampId/reviews',reviewRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/:id/photo').put(protect,authorize('publisher','admin'),bootcampPhotoUpload);
router.route('/')
  .get(advancedResults(Bootcamp, 'courses'),getBootcamps)
  .post(protect,authorize('publisher','admin'),createBootcamp)

router.route('/:id')
  .get(getBootcamp)
  .put(protect,authorize('publisher','admin'),updateBootcamp)
  .delete(protect,authorize('publisher','admin'),deleteBootcamp)
  
module.exports = router;