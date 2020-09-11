import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import Alert from "../Alert/Alarm.jsx";
import "./NewCourse.scss";

const NewCourse = ({ user, city, component, courses }) => {
  const history = useHistory();
  const [allCities, setAllCities] = useState(null);
  const [cityNameVisible, setCityNameVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [values, setValues] = useState({
    intakeName: "",
    cityName: "",
    startDate: "",
    endDate: "",
  });
  const showCities = useCallback(() => {
    if (courses) {
      let citiesName = courses.map((course) => course.cityName);
      citiesName = citiesName.filter((a, b) => citiesName.indexOf(a) === b);
      setValues({
        intakeName: "",
        cityName: citiesName[0],
        startDate: "",
        endDate: "",
      });
      setAllCities(citiesName);
    }
  }, [courses]);
  const newCourseCalendar = async () => {
    const newCourse = await axios.post(`/api/v1/courses`, {
      ...values,
    });
    if (newCourse.data.success) {
      setAlertMessage("New Course Calendar added successfully !");
      setTimeout(() => {
        history.push(`/${user}/Cities/`);
      }, 2000);
    } else {
      console.log(newCourse);
    }
  };
  useEffect(() => {
    showCities();
  }, [showCities]);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    newCourseCalendar();
  };
  return (
    <div className="new-course-calendar-container">
      {city ? (
        <div className="upcoming-class-title">
          <p>{city}</p> <i className="fas fa-chevron-right"></i>
          <p>New Course</p>
        </div>
      ) : (
        <p className="upcoming-class-title">New Course</p>
      )}
      <form className="new-course-calendar-form" onSubmit={handleSubmit}>
        {alertMessage !== "" ? (
          <Alert type={"success"} children={alertMessage} />
        ) : null}
        <div className="form-group font-size">
          <label>Intake: </label>
          <input
            name="intakeName"
            value={values.date}
            onChange={handleChange}
            type="text"
            placeholder="Intake Name . . ."
          ></input>
        </div>
        {!cityNameVisible && !city && (
          <div className="form-group font-size test">
            <label>City Name:</label>
            <select
              className="form-control"
              name="cityName"
              value={values.date}
              onChange={handleChange}
            >
              {allCities &&
                allCities.map((city, index) => {
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

        {(cityNameVisible || city) && (
          <div className="form-group font-size test">
            <label>New City Name: </label>
            <input
              type="text"
              name="cityName"
              value={city ? city : values.date}
              onChange={handleChange}
              className="form-control"
              placeholder="New City Name . . ."
            ></input>
            {!city ? (
              <i
                className="fas fa-minus minus-style"
                onClick={() => setCityNameVisible(!cityNameVisible)}
              ></i>
            ) : null}
          </div>
        )}
        <div className="form-group font-size">
          <label>Start Date: </label>
          <input
            type="date"
            name="startDate"
            value={values.date}
            onChange={handleChange}
            className="form-control"
          ></input>
        </div>
        <div className="form-group font-size">
          <label>End Date: </label>
          <input
            type="date"
            name="endDate"
            value={values.date}
            onChange={handleChange}
            className="form-control"
          ></input>
        </div>
        <div className="form-group font-size">
          <input
            type="submit"
            disabled={
              !values.intakeName ||
              !values.cityName ||
              !values.startDate ||
              !values.endDate
            }
            className="form-control"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default NewCourse;
