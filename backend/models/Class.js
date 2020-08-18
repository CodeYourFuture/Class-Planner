const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  courseCalendar_Id: {
    type: String,
  },
  module_Id: {
    type: String,
  },
  className: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  syllabusUrl: {
    type: String,
  },
  scheduleType: {
    type: String,
  },
});

module.exports = mongoose.model("Class", ClassSchema);
