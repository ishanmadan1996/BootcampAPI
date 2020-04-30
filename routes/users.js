const express = require("express");
const router = express.Router({mergeParams: true});
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users')

const User = require('../models/User');

// Bringing in the required middleware functions
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Every route below these two lines will be protected and authroized
// which means to use each route, user needs to be logged in as admin
router.use(protect);
router.use(authorize('admin'))

router
    .route('/')
    .get(advancedResults(User),getUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;