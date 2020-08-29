import React from "react";
import { MonthNames } from "../../utils/MonthNames";
import "./CourseCalendarForm.scss";

const CourseCalendarForm = ({ courses, pageData }) => {
  return (
    <div className="coursecalendarform-container">
      <p className="new-class-title">
        {pageData.city} <i className="fas fa-angle-right"></i>{" "}
        <>{pageData.title}</>
      </p>
      <div className="filter-container">
        <div className="control-container">
          <label>Intake: </label>
          <select>
            {courses &&
              courses
                .filter((course) => course.cityName === pageData.city)
                .map((course, index) => {
                  return (
                    <option value={course._id} key={index}>
                      {" "}
                      {course.intakeName}
                    </option>
                  );
                })}
          </select>
        </div>
        <div className="control-container">
          <label>Month: </label>
          <select>
            {MonthNames.map((month, index) => {
              return (
                <option value={month} key={index}>
                  {" "}
                  {month}
                </option>
              );
            })}
          </select>
        </div>
        <div className="control-container">
          <input type="checkbox" />
          <label>Show Holiday </label>
        </div>
      </div>
    </div>
  );
};

export default CourseCalendarForm;
