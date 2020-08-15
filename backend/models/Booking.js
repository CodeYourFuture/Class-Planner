const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please add Full name']
  },
  email: {
    type: string,
    required: [true, 'Please add email']
  },
  roleName: {
    type: string,
    required: [true, 'Please add role']
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  bookingTime: {
    type: string
  },
  classId: {
    type: string
  }
});

module.exports = mongoose.model('Booking', BookingSchema);