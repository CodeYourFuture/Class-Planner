const express = require('express');
const router = express.Router();
const {
  getBookings,
  getClassBookings,
  createBooking,
  deleteBooking,
  updateBooking,
  sendEmailToAllVolunteers,
} = require('../controllers/bookings');

router.route('/').get(getBookings).post(createBooking);
router.route('/email/send').post(sendEmailToAllVolunteers);

router
  .route('/:id')
  .delete(deleteBooking)
  .put(updateBooking)
  .get(getClassBookings);

module.exports = router;