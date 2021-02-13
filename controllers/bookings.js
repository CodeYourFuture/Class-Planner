const Booking = require('../models/Booking');
const validateBookingInput = require('../validation/booking');
const {
  bookingConfirmationEmail,
  adminSendEmailToClassVolunteers,
} = require('../utils/notification');
const Class = require('../models/Class');
const dayjs = require('dayjs');
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

exports.getClassBookings = async (req, res) => {
  try {
    const classId = req.params.id;
    const booking = await Booking.find({ classId });
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'No booking found',
      });
    }
    return res.status(200).json({
      success: true,
      count: booking.length,
      data: booking,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: 'Could not get class bookings',
    });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const volunteerEmail = req.body.email.toLowerCase();
    const { errors, isValid } = validateBookingInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Booking.findOne(
      { email: volunteerEmail, classId: req.body.classId },
      async (err, result) => {
        if (result) {
          return res.status(400).json({
            success: false,
            message:
              'Email already exists, You have already booked for this class, thanks!',
          });
        } else if (err) {
          return res.status(500).json({
            success: false,
            error: 'Server Error',
          });
        } else {
          const allBooking = await Booking.find({ classId: req.body.classId });
          if (allBooking && allBooking.length > 13) {
            return res.status(400).json({
              success: false,
              message:
                'Sorry, there are enough TAs for this class, could you please sign up for a separate class, thanks!',
            });
          }

          const newBooking = await Booking.create(req.body);
          const classInfo = await Class.findById(req.body.classId);
          newBooking.classDate = dayjs(classInfo.date).format('DD/MM/YYYY');
          newBooking.classStartTime = classInfo.startTime;
          newBooking.classEndTime = classInfo.endTime;
          await bookingConfirmationEmail(newBooking);
          return res.status(201).json({
            success: true,
            data: newBooking,
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'No booking found',
      });
    }

    await booking.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error, could not delete booking',
    });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const { errors, isValid } = validateBookingInput(bookingData);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const bookingId = req.params.id;
    const query = { _id: bookingId };
    const booking = await Booking.findOneAndUpdate(query, bookingData);
    if (!booking) {
      return res.status(400).json({
        success: false,
        error: 'booking not found!',
      });
    }
    return res.status(200).json({
      success: true,
      data: bookingData,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: 'Could not update booking',
    });
  }
};

exports.sendEmailToAllVolunteers = async (req, res) => {
  try {
    const emailData = req.body;
    if (emailData.subject === '' || emailData.emailText === '') {
      return res.status(400).json("'Subject or email can not be empty.'");
    }
    const classId = emailData.classId;
    const classBookings = await Booking.find({ classId });
    if (classBookings && !classBookings.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          'Sorry, there are no volunteers signed up for this class, thanks!',
      });
    }
    const emails = [];
    classBookings.forEach((booking) => emails.push(booking.email));
    emailData.emails = emails;
    await adminSendEmailToClassVolunteers(emailData);
    return res.status(200).json({
      success: true,
      message: 'An email notification is sent to all volunteers, thanks!',
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: 'Could not Send Emails',
    });
  }
};
