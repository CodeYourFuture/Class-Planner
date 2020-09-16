const express = require("express");
const router = express.Router();
const {
  getBookings,
  getClassBookings,
  createBooking,
  deleteBooking,
  updateBooking,
} = require("../controllers/bookings");

router.route("/").get(getBookings).post(createBooking);

router
  .route("/:id")
  .delete(deleteBooking)
  .put(updateBooking)
  .get(getClassBookings);

module.exports = router;
