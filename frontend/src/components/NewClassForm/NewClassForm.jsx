import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import dayjs from "dayjs";
import { createClass, updateClass } from "../../redux/actions";
import { set_CurrentClass } from "../../redux/actions/ClassAction";
import { Send_PageData } from "../../redux/actions";
import httpClient from "../../common/httpClient/httpClient.js";
import Alert from "../../components/Alert/Alarm.jsx";
import "./NewClassForm.scss";

const mapStateToProps = (state) => {
  return {
    pageData: state.PageReducer.pageData,
    CurrentClass: state.ClassReducer.currentClass,
    getErrors: state.getErrors,
  };
};

const NewClassForm = ({
  getErrors,
  createClass,
  updateClass,
  CurrentClass,
  Send_PageData,
  pageData,
}) => {
  const history = useHistory();
  const [weekState, setWeekState] = useState({ status: "Class" });
  const [submitted, setSubmitted] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [courses, setCourses] = useState(null);

  const [values, setValues] = useState({
    date: "",
    courseCalendar_Id: "",
    status: "Class",
    className: "",
    startTime: "",
    endTime: "",
    syllabusURL: "",
    scheduleType: "Education Lead Class",
  });
  const get_Courses = useCallback(async () => {
    let allCourses = await httpClient.get(`/api/v1/courses/`);
    allCourses = allCourses.data.data.filter(
      (course) => course.cityName === pageData.city
    );
    setValues({
      date: "",
      courseCalendar_Id: allCourses && allCourses[0]._id,
      status: "Class",
      className: "",
      startTime: "",
      endTime: "",
      syllabusURL: "",
      scheduleType: "Education Lead Class",
    });
    setCourses(allCourses);
  }, [pageData]);
  useEffect(() => {
    get_Courses();
  }, [get_Courses]);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (e) => {
    values.status = weekState.status === "Class" ? true : false;
    if (edit) {
      if (!values.status) {
        values.startTime = null;
        values.scheduleType = null;
        values.syllabusURL = null;
        values.endTime = null;
      }
      e.preventDefault();
      updateClass(CurrentClass._id, values);
      setTimeout(() => {
        Send_PageData(pageData.user, "Course Calendar", pageData.city);
        history.push("/coursecalendar/");
      }, 2000);
      set_CurrentClass(values);
      setEdit(false);
      setUpdated(true);
    } else {
      e.preventDefault();      
      createClass(values);
      setSubmitted(true);
      setTimeout(() => {
        Send_PageData(pageData.user, "Course Calendar", pageData.city);
        history.push("/coursecalendar/");
      }, 2000);
    }
    setWeekState({ status: "Class" });
  };
  useEffect(() => {
    if (pageData.title === "Edit Class") {
      setValues({
        status: CurrentClass ? CurrentClass.status : null,
        date: CurrentClass
          ? dayjs(CurrentClass.date).format("YYYY-MM-DD")
          : null,
        startTime: CurrentClass ? CurrentClass.startTime : null,
        endTime: CurrentClass ? CurrentClass.endTime : null,
        className: CurrentClass ? CurrentClass.className : null,
        scheduleType: CurrentClass ? CurrentClass.scheduleType : null,
        syllabusURL: CurrentClass ? CurrentClass.syllabusURL : null,
        courseCalendar_Id: CurrentClass ? CurrentClass.courseCalendar_Id : null,
      });
      setEdit(true);
    }
  }, [pageData, CurrentClass]);
  return (
    <div className="new-class-container">
      <div className="upcoming-class-title">
        <p>{pageData.city}</p> <i className="fas fa-chevron-right"></i>
        <p>{pageData.title}</p>
      </div>
      <form className="new-class-form" onSubmit={handleSubmit}>
        {submitted && Object.keys(getErrors).length !== 0 && (
          <Alert type={"danger"} children={getErrors.syllabusURL} />
        )}
        {submitted && Object.keys(getErrors).length === 0 && (
          <Alert type={"success"} children={"New class successfully added!"} />
        )}
        {updated && Object.keys(getErrors).length !== 0 && (
          <Alert type={"danger"} children={getErrors.message} />
        )}
        {updated && Object.keys(getErrors).length === 0 && (
          <Alert
            type={"success"}
            children={"New class successfully updated!"}
          />
        )}
        <div className="form-group font-size">
          <label>Intake: </label>
          <select
            name="courseCalendar_Id"
            className="form-control"
            value={values.date}
            onChange={handleChange}
          >
            {courses &&
              courses.map((course, index) => {
                return (
                  <option key={index} value={course._id}>
                    {course.intakeName}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group font-size">
          <label htmlFor="date">Date: </label>
          <input
            name="date"
            type="Date"
            className="form-control"
            value={values.date}
            onChange={handleChange}
          ></input>
        </div>

        <div className="form-group  font-size">
          <label>Status:</label>
          <div>
            <input
              id="Class"
              type="radio"
              name="classstatus"
              defaultChecked
              onChange={() => setWeekState({ status: "Class" })}
            />
            <label htmlFor="Class">Class</label>
            <input
              type="radio"
              name="classstatus"
              onChange={() => setWeekState({ status: "Holiday" })}
            />
            <label htmlFor="Holiday">Holiday</label>
          </div>
        </div>
        {weekState.status === "Class" ? (
          <>
            <div className="form-group font-size">
              <label htmlFor="ClassName">Class Name:</label>
              <input
                name="className"
                className="form-control"
                type="text"
                placeholder="Class Name"
                value={values.className}
                onChange={handleChange}
              ></input>
            </div>

            <div className="form-group font-size">
              <label htmlFor="startTime">Start Time:</label>
              <input
                name="startTime"
                className="form-control"
                type="time"
                value={values.startTime}
                onChange={handleChange}
              ></input>
            </div>

            <div className="form-group font-size">
              <label htmlFor="endTime">End Time:</label>
              <input
                name="endTime"
                className="form-control"
                type="time"
                value={values.endTime}
                onChange={handleChange}
              ></input>
            </div>

            <div className="form-group font-size">
              <label htmlFor="syllabusURL">Syllabus URL:</label>
              <input
                name="syllabusURL"
                className="form-control"
                type="text"
                placeholder="Syllabus URL"
                value={values.syllabusURL}
                onChange={handleChange}
              ></input>
            </div>

            <div className="form-group font-size">
              <label htmlFor="role">Schedule:</label>
              <select
                name="scheduleType"
                className="form-control"
                placeholder="Schedule"
                value={values.scheduleType}
                onChange={handleChange}
              >
                <option value="Education Lead Class">
                  Education Lead Class
                </option>
                <option value="Personal Development Team Lead Class">
                  Personal Development Team Lead Class
                </option>
              </select>
            </div>
          </>
        ) : (
          <div className="form-group font-size">
            <label htmlFor="ClassName">Reason:</label>
            <input
              name="className"
              className="form-control"
              type="text"
              placeholder="Reason . . ."
              value={values.className}
              onChange={handleChange}
            ></input>
          </div>
        )}

        <div className="form-group font-size">
          <input
            type="submit"
            disabled={
              !values.date ||
              !values.className ||
              !values.syllabusURL ||
              !values.scheduleType ||
              !values.status ||
              !values.startTime ||
              !values.endTime
            }
          ></input>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, { createClass, updateClass, Send_PageData })(
  NewClassForm
);
