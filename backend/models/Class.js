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
  },
  date: {
    type: Date,
    default: Date.now,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  syllabusURL: {
    type: String,
  },
  scheduleType: {
    type: String,
  },
});

module.exports = mongoose.model("Class", ClassSchema);
