import React, { useState, useEffect, useCallback } from "react";
import ClassCard from "../../components/ClassCard/ClassCard.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import { connect } from "react-redux";
import httpClient from "../../common/httpClient/httpClient.js";
import { MonthNames } from "../../utils/MonthNames";
import dayjs from "dayjs";
import "./CourseCalendarForm.scss";
const mapStateToProps = (state) => {
  return {
    pageData: state.PageReducer.pageData,
  };
};
const CourseCalendarForm = ({ pageData }) => {
  const [showHolidays, setShowHolidays] = useState(false);
  const [course, setCourse] = useState(null);
  const [month, setMonth] = useState("All-Months");
  const [courses, setCourses] = useState(null);
  const [classes, setClasses] = useState(null);
  const get_Courses = useCallback(async () => {
    let allCourses = await httpClient.get(`/api/v1/courses/`);
    allCourses = allCourses.data.data.filter(
      (course) => course.cityName === pageData.city
    );
    setCourses(allCourses);
  }, [pageData]);
  const get_Classes = useCallback(async (course) => {
    let allClasses = await httpClient.get(`/api/v1/classes/`);
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
  console.log("0");
  return (
    <div className="coursecalendarform-container">
      <p className="upcoming-class-title">
        <p>{pageData.city}</p> <i class="fas fa-chevron-right"></i>
        <p>{pageData.title}</p>
      </p>
      <div className="filter-container">
        <div className="control-container">
          <label>Intake: </label>
          <select onChange={(e) => setCourse(e.target.value)}>
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
          <select onChange={(e) => setMonth(e.target.value)}>
            <option value="All-Months">All Months</option>
            {MonthNames.map((month, index) => {
              return (
                <option value={index + 1} key={index}>
                  {" "}
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
                  Class={Class}
                  key={index}
                  WeekNumber={Class.weekNumber}
                />
              );
            })) || <Loading />}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(CourseCalendarForm);
