import React, { useState } from "react";
import Alert from "../../components/Alert/Alarm.jsx";
import "./CourseForm.scss";

const CourseForm = ({
  city,
  component,
  citiesName,
  alertMessage,
  entryData,
  error,
  _onChange,
  _onSubmit,
  intakeName,
  cityName,
  startDate,
  endDate,
}) => {
  const [cityNameVisible, setCityNameVisible] = useState(false);
  return (
    <div className="new-course-calendar-container">
      {city ? (
        <div className="page-title">
          <p>{city}</p> <i className="fas fa-chevron-right"></i>
          <p>{component === "newcourse" ? "New Course" : "Edit Course"}</p>
        </div>
      ) : (
        <p className="page-title">New Course</p>
      )}
      <form
        className="new-course-calendar-form"
        noValidate
        onSubmit={_onSubmit}
      >
        {alertMessage && alertMessage !== "" ? (
          <Alert type={alertMessage.type} children={alertMessage.message} />
        ) : null}
        <div className="form-group font-size">
          <label>Intake: </label>
          <input
            name="intakeName"
            type="text"
            defaultValue={intakeName ? intakeName : ""}
            onChange={(e) => _onChange(e)}
            placeholder="Intake Name . . ."
            className={
              error && error.intakeName ? "form-control error" : "form-control"
            }
            ref={(e) =>
              (entryData.current[0] = {
                element: e,
                required: true,
              })
            }
          ></input>
        </div>
        <div className="err-msg">
          {error && error.intakeName && <p> *&nbsp;Intake Name is required!</p>}
        </div>
        {!cityNameVisible && citiesName && citiesName !== "Nothing" && (
          <div className="form-group font-size test">
            <label>City Name:</label>
            <select
              name="cityName"
              className="form-control"
              ref={(e) =>
                (entryData.current[1] = {
                  element: e,
                  required: true,
                })
              }
            >
              {citiesName.map((city, index) => {
                return (
                  <option key={index} value={city}>
                    {city}
                  </option>
                );
              })}
            </select>
            <i
              className="fas fa-plus plus-style"
              onClick={() => setCityNameVisible(!cityNameVisible)}
            ></i>
          </div>
        )}

        {(cityNameVisible || city || citiesName === "Nothing") && (
          <React.Fragment>
            <div
              className={
                city ? "form-group font-size" : "form-group font-size test"
              }
            >
              <label>{city ? "City Name: " : "New City Name: "} </label>
              <input
                type="text"
                name="cityName"
                value={city}
                defaultValue={cityName}
                onChange={(e) => _onChange(e)}
                className={
                  error && error.cityName
                    ? "form-control error"
                    : "form-control"
                }
                placeholder="New City Name . . ."
                ref={(e) =>
                  (entryData.current[1] = {
                    element: e,
                    required: true,
                  })
                }
              ></input>
              {!city ? (
                <i
                  className="fas fa-minus minus-style"
                  onClick={() => setCityNameVisible(!cityNameVisible)}
                ></i>
              ) : null}
            </div>
            <div className="err-msg">
              {error && error.cityName && (
                <p> *&nbsp; City Name is required!</p>
              )}
            </div>
          </React.Fragment>
        )}
        <div className="form-group font-size">
          <label>Start Date: </label>
          <input
            type="date"
            name="startDate"
            defaultValue={startDate}
            onChange={(e) => _onChange(e)}
            className={
              error && error.startDate ? "form-control error" : "form-control"
            }
            ref={(e) =>
              (entryData.current[2] = {
                element: e,
                required: true,
              })
            }
          ></input>
        </div>
        <div className="err-msg">
          {error && error.startDate && <p> *&nbsp;Start Date is required!</p>}
        </div>
        <div className="form-group font-size">
          <label>End Date: </label>
          <input
            type="date"
            name="endDate"
            defaultValue={endDate}
            onChange={(e) => _onChange(e)}
            className={
              error && error.endDate ? "form-control error" : "form-control"
            }
            ref={(e) =>
              (entryData.current[3] = {
                element: e,
                required: true,
              })
            }
          ></input>
        </div>
        <div className="err-msg">
          {error && error.endDate && <p> *&nbsp;End Date is required!</p>}
        </div>
        <div className="form-group font-size">
          <input type="submit" className="form-control"></input>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
