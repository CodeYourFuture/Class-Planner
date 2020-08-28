import React from "react";
import { MonthNames } from "../../utils/MonthNames";
import "./CourseCalendarForm.scss";

const CourseCalendarForm = () => {
  return (
    <div className="coursecalendarform-container">
      <label>Course Calendar</label>
      <div className="filter-container">
        <div className="control-container">
        <label>Intake: </label>
          <select>
            {MonthNames.map((month) => {
              return <option value={month}> {month}</option>;
            })}
          </select>
        </div>
        <div className="control-container">
          <label>Month: </label>
          <select>
            {MonthNames.map((month) => {
              return <option value={month}> {month}</option>;
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
