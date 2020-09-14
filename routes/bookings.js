const express = require("express");
const router = express.Router();
const {
  getBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
} = require("../controllers/bookings");

router.route("/").get(getBookings).post(createBooking);

router.route("/:id").delete(deleteBooking).put(updateBooking).get(getBooking);

module.exports = router;
