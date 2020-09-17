import { useState, useRef } from "react";
import validator from "validator";

export const useForm = (callback) => {
  const [error, setError] = useState(null);
  const [submite, setSubmit] = useState(true);
  const entryData = useRef([]);

  const validateForm = () => {
    let _error = {};
    entryData.current.forEach((element) => {
      let key = "";
      if (element.element) {
        switch (element.element.type) {
          case "text":
            if (element.required && element.element.value === "") {
              key = element.element.name;
              _error[key] = `${element.element.name} is required!`;
            }
            break;
          case "date":
            if (
              element.element.value !== "" &&
              !validator.isDate(element.element.value)
            ) {
              key = element.element.name;
              _error[key] = `${element.element.name} is not Valid!`;
            }
            if (element.required && element.element.value === "") {
              key = element.element.name;
              _error[key] = `${element.element.name} is required!`;
            }
            break;
          case "time":
            if (
              element.element.value !== "" &&
              !new RegExp(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]?$/g).test(
                element.element.value
              )
            ) {
              key = element.element.name;
              _error[key] = `${element.element.name} is not Valid!`;
            }
            if (element.required && element.element.value === "") {
              key = element.element.name;
              _error[key] = `${element.element.name} is required!`;
            }
            break;
          case "number":
            if (
              element.element.value !== "" &&
              !new RegExp(/^[0-9]*$/g).test(element.element.value)
            ) {
              key = element.element.name;
              _error[key] = `${element.element.name} is not Valid!`;
            }
            if (element.required && element.element.value === "") {
              key = element.element.name;
              _error[key] = `${element.element.name} is required!`;
            }
            break;
          case "email":
            if (
              element.element.value !== "" &&
              !validator.isEmail(element.element.value)
            ) {
              key = element.element.name;
              _error[key] = `${element.element.name} is not Valid!`;
            }
            if (element.required && element.element.value === "") {
              key = element.element.name;
              _error[key] = `${element.element.name} is required!`;
            }
            break;
          case "select-one":
            if (element.required && element.element.value === "") {
              key = element.element.name;
              _error[key] = `${element.element.name} is required!`;
            }
            break;
          case "url":
            if (
              element.element.value !== "" &&
              !validator.isURL(element.element.value)
            ) {
              key = element.element.name;
              _error[key] = `${element.element.name} is not Valid!`;
            }
            if (element.required && element.element.value === "") {
              key = element.element.name;
              _error[key] = `${element.element.name} is required!`;
            }
            break;
          default:
            break;
        }
      }
    });
    return _error;
  };
  const onChange = (event) => {
    setSubmit(true);
    if (
      event.target.value !== "" &&
      error &&
      error.hasOwnProperty(event.target.name.toString())
    ) {
      let _error = JSON.parse(JSON.stringify(error));
      let key = event.target.name.toString();
      delete _error[key];
      if (_error !== error) {
        setError(JSON.stringify(_error) !== "{}" ? _error : null);
      }
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (submite) {
      setSubmit(false);
      if (JSON.stringify(validateForm()) !== "{}") {
        setError(validateForm());
      } else {
        let _Values = {};
        let key = "";
        entryData.current.forEach((element) => {
          if (element.element) {
            key = element.element.name;
            _Values[key] =
              element.element.type === "radio"
                ? element.element.checked
                  ? true
                  : false
                : `${element.element.value}`;
          }
        });
        callback(_Values);
        setError(null);
      }
    }
  };

  const setSubmit_F = (param) => {
    setSubmit(param);
  };
  return {
    entryData,
    onChange,
    onSubmit,
    setSubmit_F,
    error,
  };
};
