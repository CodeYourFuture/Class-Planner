const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    classId: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
