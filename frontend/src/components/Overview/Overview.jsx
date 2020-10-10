import React, { useEffect } from "react";
import ClassCard from "../ClassCard/ClassCard.jsx";
import Loading from "../Loading/Loading.jsx";
import { useFilter } from "../../hooks/overview/useFilter.jsx";
import "./Overview.scss";

const CourseCalendar = ({ user, component }) => {
  const { entryData, getData, filter, search, data } = useFilter();
  useEffect(() => {
    if (data === null) {
      getData();
    }
  }, [getData, data]);
  return (
    <div className="coursecalendarform-container">
      <div className="page-title">
        <p>Class Planner</p> <i className="fas fa-chevron-right"></i>
        <p>Overview</p>
      </div>
      <div className="filter-container">
        <div className="control-container">
          <label>City: </label>
          <select
            onChange={() => filter()}
            ref={(e) => (entryData.current[1] = e)}
          >
            {data &&
              data.cities.map((City, index) => {
                return (
                  <option value={City} key={index}>
                    {City}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="control-container">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search . . ."
            onChange={() => search()}
            ref={(e) => (entryData.current[0] = e)}
          />
        </div>
      </div>
      <div className="classes-list-container ">
        {(data &&
          data.filteredClasses.length > 0 &&
          data.filteredClasses.map((Class, index) => {
            if (Class.status) {
              return (
                <ClassCard
                  user={user}
                  city={entryData.current[1].value}
                  Class={Class}
                  component={component}
                  key={index}
                  WeekNumber={Class.weekNumber}
                />
              );
            }
            return null;
          })) || <Loading />}
      </div>
    </div>
  );
};

export default CourseCalendar;
