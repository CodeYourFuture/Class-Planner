const express = require("express");
const router = express.Router();
const { getBookingsByClassId } = require("../controllers/bookings");

router.route("/:classId").get(getBookingsByClassId);

module.exports = router;
