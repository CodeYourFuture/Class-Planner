const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  className: {
    type: String,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  moduleName: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  statusMessage: {
    type: String,
  },
  syllabusUrl: {
    type: String,
  },
  schedule: {
    type: String,
  },
});

module.exports = mongoose.model("Class", ClassSchema);
