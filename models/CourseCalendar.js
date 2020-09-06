const mongoose = require("mongoose");

const CourseCalendarSchema = new mongoose.Schema(
  {
    intakeName: {
      type: String,
    },
    cityName: {
      type: String,
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
