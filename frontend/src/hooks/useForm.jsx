import { useState, useRef } from "react";

export const useForm = (callback) => {
  const [error, setError] = useState(null);
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
              !new RegExp(
                /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/i
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
              element.element.value !== "" &&
              !new RegExp(
                /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/g
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
          default:
            break;
        }
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
  };

  return {
    entryData,
    onChange,
    onSubmit,
    error,
  };
};
