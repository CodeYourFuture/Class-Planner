const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateClassInput(data) {
  let errors = {};
  if (data.status) {
    data.courseCalendar_Id = !isEmpty(data.courseCalendar_Id)
      ? data.courseCalendar_Id
      : "";
    data.date = !isEmpty(data.date) ? data.date : "";
    data.className = !isEmpty(data.className) ? data.className : "";
    data.startTime = !isEmpty(data.startTime) ? data.startTime : "";
    data.endTime = !isEmpty(data.endTime) ? data.endTime : "";
    data.scheduleType = !isEmpty(data.scheduleType) ? data.scheduleType : "";
    data.syllabusURL = !isEmpty(data.syllabusURL) ? data.syllabusURL : "";

    if (!isEmpty(data.syllabusURL)) {
      if (!Validator.isURL(data.syllabusURL)) {
        errors.syllabusURL = "* Not a valid URL!";
      }
    }
    if (
      parseInt(data.startTime.replace(/\D/g, "")) >=
      parseInt(data.endTime.replace(/\D/g, ""))
    ) {
      errors.endTime = "* End time should be after Start time";
    }
    if (
      parseInt(data.endTime.replace(/\D/g, "")) <
      parseInt(data.startTime.replace(/\D/g, ""))
    ) {
      errors.startTime = "* Start time should be after End time";
    }
    if (Validator.isEmpty(data.syllabusURL)) {
      errors.syllabusURL = "* Syllabus field is required";
    }
    if (Validator.isEmpty(data.scheduleType)) {
      errors.scheduleType = "* Schedule field is required";
    }
    if (Validator.isEmpty(data.endTime)) {
      errors.endTime = "* End time field is required";
    }
    if (Validator.isEmpty(data.startTime)) {
      errors.startTime = "* Start time field is required";
    }
    if (Validator.isEmpty(data.className)) {
      errors.className = "* Class name field is required";
    }
    if (Validator.isEmpty(data.date)) {
      errors.date = "* Date field is required";
    }
    if (Validator.isEmpty(data.courseCalendar_Id)) {
      errors.courseCalendar_Id = "* Course Calendar field is required";
    }
  } else {
    data.scheduleType = !isEmpty(data.scheduleType) ? data.scheduleType : "";
    data.className = !isEmpty(data.className) ? data.className : "";
    data.startTime = !isEmpty(data.startTime) ? data.startTime : "";
    data.endTime = !isEmpty(data.endTime) ? data.endTime : "";
    data.scheduleType = !isEmpty(data.scheduleType) ? data.scheduleType : "";
    data.syllabusURL = !isEmpty(data.syllabusURL) ? data.syllabusURL : "";
    data.courseCalendar_Id = !isEmpty(data.courseCalendar_Id)
      ? data.courseCalendar_Id
      : "";

    if (Validator.isEmpty(data.courseCalendar_Id)) {
      errors.courseCalendar_Id = "* Course Calendar field is required";
    }
    if (Validator.isEmpty(data.className)) {
      errors.className = "* Reason field is required";
    }
  }

  return { errors, isValid: isEmpty(errors) };
};
