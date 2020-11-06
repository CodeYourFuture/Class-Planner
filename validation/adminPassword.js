const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAdminPasswordInput(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.password)) {
    errors.password = "* Password field is required";
  }
  return { errors, isValid: isEmpty(errors) };
};
