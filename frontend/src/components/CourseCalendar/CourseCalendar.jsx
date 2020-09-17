import React, { useState, useEffect } from "react";
import ClassCard from "../ClassCard/ClassCard.jsx";
import Loading from "../Loading/Loading.jsx";
import { MonthNames } from "../../utils/MonthNames";
import { useFilter } from "../../hooks/useFilter.jsx";
import dayjs from "dayjs";
import "./CourseCalendar.scss";

const CourseCalendar = ({ user, city, component }) => {
  const [showHolidays, setShowHolidays] = useState(false);
  const { entryData, getData, filter, data } = useFilter();

  useEffect(() => {
    if (data === null) {
      getData(city);
    }
  }, [city, getData, data]);
  return (
    <div className="coursecalendarform-container">
      <div className="page-title">
        <p>{city}</p> <i className="fas fa-chevron-right"></i>
        <p>Course Calendar</p>
      </div>
      <div className="filter-container">
        <div className="control-container">
          <label>Search:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search . . ."
            onChange={() => filter()}
            ref={(e) => (entryData.current[0] = e)}
          />
        </div>
        <div className="control-container">
          <label>Intake: </label>
          <select
            onChange={() => filter()}
            ref={(e) => (entryData.current[1] = e)}
          >
            {data &&
              data.courses.map((course, index) => {
                if (course._id === data.courseId) {
                  return (
                    <option selected value={course._id} key={index}>
                      {course.intakeName}
                    </option>
                  );
                } else {
                  return (
                    <option value={course._id} key={index}>
                      {course.intakeName}
                    </option>
                  );
                }
              })}
          </select>
        </div>
        <div className="control-container">
          <label>Month: </label>
          <select
            defaultValue={dayjs(new Date()).format("M")}
            onChange={() => filter()}
            ref={(e) => (entryData.current[2] = e)}
          >
            <option value="All-Months">All Months</option>
            {MonthNames.map((month, index) => {
              return (
                <option value={index + 1} key={index}>
                  {month}
                </option>
              );
            })}
          </select>
        </div>
        <div className="control-container">
          <input
            type="checkbox"
            onChange={() => setShowHolidays(!showHolidays)}
          />
          <label>Show Holiday </label>
        </div>
      </div>
      <div className="classes-list-container">
        {(data &&
          data.classes.length > 0 &&
          data.classes.map((Class, index) => {
            if (!showHolidays && !Class.status) {
              return null;
            }
            return (
              <ClassCard
                user={user}
                city={city}
                Class={Class}
                component={component}
                key={index}
                WeekNumber={Class.weekNumber}
              />
            );
          })) || <Loading />}
      </div>
    </div>
  );
};

export default CourseCalendar;
