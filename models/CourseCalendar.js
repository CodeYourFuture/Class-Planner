const mongoose = require("mongoose");

const CourseCalendarSchema = new mongoose.Schema(
  {
    intakeName: {
      type: String,
      trim: true,
    },
    cityName: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseCalendar", CourseCalendarSchema);
