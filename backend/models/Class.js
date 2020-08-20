const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  courseCalendar_Id: {
    type: String,
  },
  moduleName: {
    type: String,
  },
  className: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
  },
  syllabusURL: {
    type: String,
    required: true,
  },
  scheduleType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Class", ClassSchema);
