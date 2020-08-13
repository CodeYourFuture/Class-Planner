const express = require('express');
const router = express.Router();
const { getClasses,addClass,deleteClass } = require('../controllers/classes');

router
  .route('/')
  .get(getClasses)
  .post(addClass);

router
  .route("/:id")
  .delete(deleteClass);

module.exports = router;