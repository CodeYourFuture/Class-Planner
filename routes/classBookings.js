const express = require("express");
const router = express.Router();
const {
  cancelClassBookings,
  getClassBookings,
} = require("../controllers/bookings");

router.route("/:classId").get(getClassBookings).delete(cancelClassBookings);

module.exports = router;
