const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  className: {
    type: String,
  },
  roleName: {
    type: String,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
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
