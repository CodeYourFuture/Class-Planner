const Booking = require("../models/Booking");
const validateBookingInput = require("../validation/booking");
const { bookingConfirmationEmail } = require("../utils/notification");
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
      error: "Server Error",
    });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const booking = await Booking.findById({ _id: id });
      if (booking) {
        return res.status(200).json({
          success: true,
          count: booking.length,
          data: booking,
        });
      }
    }
  } catch (err) {
    console.log("Error", err);
    return res.status(400).json({
      success: false,
      error: "Could not get a booking",
    });
  }
};

exports.getClassBookings = async (req, res) => {
  try {
    const classId = req.params.classId;
    const booking = await Booking.find({ classId });
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "No booking found",
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
      error: "Could not get class bookings",
    });
  }
};

exports.cancelClassBookings = async (req, res) => {
  try {
    const classId = req.params.classId;
    const bookings = await Booking.deleteMany(
      { classId },
      async (err, result) => {
        if (result) {
          //await bookingCancellationEmail(result);
          return res.status(200).json({
            success: true,
            data: {},
          });
        } else if (err) {
          return res.status(500).json({
            success: false,
            error: "Server Error",
          });
        } else {
          return res.status(404).json({
            success: false,
            error: "No booking found",
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.addBooking = async (req, res) => {
  try {
    const { errors, isValid } = validateBookingInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const booking = Booking.findOne(
      { email: req.body.email, classId: req.body.classId },
      async (err, result) => {
        if (result) {
          const multipleBooking = {};
          multipleBooking.email =
            "Email already exists, You have already booked for this class and thanks.";
          return res.status(400).json(multipleBooking);
        } else if (err) {
          return res.status(500).json({
            success: false,
            error: "Server Error",
          });
        } else {
          const newBooking = await Booking.create(req.body);
         // await bookingConfirmationEmail(newBooking);
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
      error: "Server Error",
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
        error: "No booking found",
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
      error: "Server Error, could not delete booking",
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
        error: "booking not found!",
      });
    }
    return res.status(200).json({
      success: true,
      data: bookingData,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: "Could not update booking",
    });
  }
};
