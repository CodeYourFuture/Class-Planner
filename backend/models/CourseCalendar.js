const mongoose = require("mongoose");

const CourseCalendarSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("CourseCalendar", CourseCalendarSchema);
