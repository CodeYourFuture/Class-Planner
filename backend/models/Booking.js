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
    required: [true, "Please add Full name"],
  },
  email: {
    type: String,
    required: [true, "Please add email"],
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
