const Booking = require("../models/Booking");
const Class = require("../models/Class");
const validateBookingInput = require("../validation/booking");

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
      const booking = await Booking.findOneBy({ _id: id });
      if (booking) {
        return res.status(200).json({
          success: true,
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

exports.getBookingsByClassId = async (req, res) => {
  try {
    const { classId } = req.params;
    const booking = await Booking.find({ classId });
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "No booking found",
      });
    }
    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: "Could not get class bookings",
    });
  }
};

exports.addBooking = async (req, res) => {
  try {
    const { errors, isValid } = validateBookingInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const booking = Booking.findOne({ email: req.body.email });
    if (booking) {
      return res
        .status(400)
        .json(
          "Email already exists, You have already booked for this class and thanks."
        );
    }
    const {
      className,
      roleName,
      fullName,
      email,
      bookingDate,
      bookingTime,
    } = req.body;

    const newBooking = await Booking.create(req.body);

    return res.status(201).json({
      success: true,
      data: newBooking,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

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
      error: "Server Error",
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
    const query = { _id: req.params.id };
    const booking = await Class.findOneAndUpdate(query, bookingData);
    if (!booking) {
      throw "booking not found!";
    }
    return res.status(200).json({
      success: true,
      data: bookingData,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      success: false,
      error: "Could not update booking",
    });
  }
};
