import React, { useState, useEffect, useCallback } from "react";
import ClassCard from "../ClassCard/ClassCard.jsx";
import Loading from "../Loading/Loading.jsx";
import axios from "axios";
import { MonthNames } from "../../utils/MonthNames";
import dayjs from "dayjs";
import "./CourseCalendar.scss";

const CourseCalendar = ({ user, city, component }) => {
  const [showHolidays, setShowHolidays] = useState(false);
  const [course, setCourse] = useState(null);
  const [month, setMonth] = useState("All-Months");
  const [courses, setCourses] = useState(null);
  const [classes, setClasses] = useState(null);
  const get_Courses = useCallback(async () => {
    let allCourses = await axios.get(`/api/v1/courses/`);
    allCourses = allCourses.data.data.filter(
      (course) => course.cityName === city
    );
    setCourses(allCourses);
  }, [city]);
  const get_Classes = useCallback(async (course) => {
    let allClasses = await axios.get(`/api/v1/classes/`);
    let counter = 0;
    allClasses = allClasses.data.data.filter(
      (Class) => course && Class.courseCalendar_Id === course
    );
    allClasses
      .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1))
      .map((Class) =>
        Class.status ? (Class.weekNumber = ++counter) : (Class.weekNumber = "-")
      );
    allClasses = JSON.parse(JSON.stringify(allClasses));
    setClasses(allClasses);
    allClasses = [];
  }, []);
  const get_Classes_OnLoading = useCallback(async () => {
    if (courses) {
      get_Classes(courses[0]._id);
    }
  }, [courses, get_Classes]);
  const get_Classes_OnLoaded = useCallback(async () => {
    if (course) {
      get_Classes(course);
    }
  }, [course, get_Classes]);
  useEffect(() => {
    get_Courses();
  }, [get_Courses]);
  useEffect(() => {
    get_Classes_OnLoading();
    get_Classes_OnLoaded();
  }, [get_Classes_OnLoading, get_Classes_OnLoaded]);
  return (
    <div className="coursecalendarform-container">
      <div className="page-title">
        <p>{city}</p> <i className="fas fa-chevron-right"></i>
        <p>Course Calendar</p>
      </div>
      <div className="filter-container">
        <div className="control-container">
          <label>Intake: </label>
          <select onChange={(e) => setCourse(e.target.value)}>
            {courses &&
              courses
                .filter((course) => course.cityName === city)
                .map((course, index) => {
                  return (
                    <option value={course._id} key={index}>
                      {course.intakeName}
                    </option>
                  );
                })}
          </select>
        </div>
        <div className="control-container">
          <label>Month: </label>
          <select onChange={(e) => setMonth(e.target.value)}>
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
        {(classes &&
          classes
            .filter(
              (Class) =>
                month === "All-Months" ||
                dayjs(Class.date).format("M") === month
            )
            .map((Class, index) => {
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
