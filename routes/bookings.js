const express = require("express");
const router = express.Router();
const {
  getBookings,
  getBooking,
  addBooking,
  deleteBooking,
  updateBooking,
} = require("../controllers/bookings");

router.route("/").get(getBookings).post(addBooking);

router
  .route("/:id")
  .delete(deleteBooking)
  .put(updateBooking)
  .get(getBooking);

module.exports = router;
