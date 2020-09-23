const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    classId: {
      type: String,
    },
    roleName: {
      type: String,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
