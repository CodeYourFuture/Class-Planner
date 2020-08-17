const Booking = require("../models/Booking");

// @desc    Get all bookings
// @route   GET /api/v1/bookings
exports.getBookings = async (req, res, next) => {
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

// @desc    Get one booking
// @route   GET /api/v1/bookings/:id
exports.getBooking = async (req, res, next) => {
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
    return res.status(400).send("Could not get booking");
  }
};

// @desc    Add booking
// @route   POST /api/v1/bookings
exports.addBooking = async (req, res, next) => {
  try {
    const {
      class_Id,
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

// @desc    Delete booking
// @route   DELETE /api/v1/bookings/:id
exports.deleteBooking = async (req, res, next) => {
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

// @desc    Update booking
// @route   Update /api/v1/bookings/:id
exports.updateBooking = async (req, res, next) => {
  try {
    const bookingData = req.body;
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
