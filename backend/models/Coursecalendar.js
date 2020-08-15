const mongoose = require("mongoose");

const CourseCalendarSchema = new mongoose.Schema({
  intakeName: {
    type: String,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CourseCalendar", CourseCalendarSchema);
