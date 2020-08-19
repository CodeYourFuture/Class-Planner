const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  className: {
    type: String,
  },
  roleName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  bookingTime: {
    type: String,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
