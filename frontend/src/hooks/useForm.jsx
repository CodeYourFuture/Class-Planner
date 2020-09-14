import { useState, useRef } from "react";

export const useForm = (callback) => {
  const [error, setError] = useState(null);
  const entryData = useRef([]);

  const validateForm = () => {
    let _error = {};
    entryData.current.forEach((element) => {
      let key = "";
      switch (element.element.type) {
        case "text":
          if (element.required && element.element.value === "") {
            key = element.element.name;
            _error[key] = `${element.element.name} is required!`;
          }
          break;
        case "date":
          if (
            !element.element.value === "" &&
            !new RegExp(
              /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i
            ).test(element.element.value)
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
            !element.element.value === "" &&
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
            !element.element.value === "" &&
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
            !element.element.value === "" &&
            !new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
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
        case "select-one":
          if (element.required && element.element.value === "") {
            key = element.element.name;
            _error[key] = `${element.element.name} is required!`;
          }
          break;
        case "url":
          if (
            !element.element.value === "" &&
            !new RegExp(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/g).test(
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
        default:
          break;
      }
    });
    return _error;
  };
  const onChange = (event) => {
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
    if (JSON.stringify(validateForm()) !== "{}") {
      setError(validateForm());
    } else {
      let _Values = {};
      let key = "";
      entryData.current.forEach((element) => {
        key = element.element.name;
        _Values[key] =
          typeof element.element.value === "boolean"
            ? element.element.value
            : `${element.element.value}`;
      });

      callback(_Values);
      setError(null);
    }
  };

  return {
    entryData,
    onChange,
    onSubmit,
    error,
  };
};
