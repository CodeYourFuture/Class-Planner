const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.date = !isEmpty(data.date) ? data.date : "";
  data.className = !isEmpty(data.className) ? data.className : "";
  data.startTime = !isEmpty(data.startTime) ? data.startTime : "";
  data.endTime = !isEmpty(data.endTime) ? data.endTime : "";
  data.scheduleType = !isEmpty(data.scheduleType) ? data.scheduleType : "";
  data.syllabusURL = !isEmpty(data.syllabusURL) ? data.syllabusURL : "";

  if (!isEmpty(data.syllabusURL)) {
    if (!Validator.isURL(data.syllabusURL)) {
      errors.syllabusURL = "Not a valid URL";
    }
  }
  if (Validator.isEmpty(data.syllabusURL)) {
    errors.syllabusURL = "Syllabus field is required";
  }
  if (Validator.isEmpty(data.scheduleType)) {
    errors.scheduleType = "Schedule field is required";
  }
  if (Validator.isEmpty(data.endTime)) {
    errors.endTime = "End time field is required";
  }
  if (Validator.isEmpty(data.startTime)) {
    errors.startTime = "Start time field is required";
  }
  if (Validator.isEmpty(data.className)) {
    errors.className = "Class name field is required";
  }
  if (Validator.isEmpty(data.date)) {
    errors.date = "Date field is required";
  }
  return { errors, isValid: isEmpty(errors) };
};
