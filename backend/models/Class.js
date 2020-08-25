const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    courseCalendar_Id: {
      type: String,
    },
    className: {
      type: String,
    },
    date: {
      type: Date,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", ClassSchema);
