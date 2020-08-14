const express = require('express');
const router = express.Router();
const { getClasses,addClass,deleteClass,updateClass} = require('../controllers/classes');

router
  .route('/')
  .get(getClasses)
  .post(addClass);

router
  .route("/:id")
  .delete(deleteClass)
  .put(updateClass);

module.exports = router;