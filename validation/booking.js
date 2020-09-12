const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBookingInput(data) {
  let errors = {};

  data.fullName = !isEmpty(data.fullName) ? data.fullName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.roleName = !isEmpty(data.roleName) ? data.roleName : "";
  data.classId = !isEmpty(data.classId) ? data.classId : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid!";
  }
  if (Validator.isEmpty(data.roleName)) {
    errors.roleName = " * Role field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "* Email field is required";
  }
  if (Validator.isEmpty(data.fullName)) {
    errors.fullName = "* Full name field is required";
  }
  if (Validator.isEmpty(data.classId)) {
    errors.classId = "* Class Id is required";
  }
  return { errors, isValid: isEmpty(errors) };
};
