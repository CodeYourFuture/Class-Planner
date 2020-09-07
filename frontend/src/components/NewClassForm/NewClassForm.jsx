import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { useHistory } from "react-router";
import { set_CurrentClass } from "../../redux/actions/ClassAction";
import { Send_PageData } from "../../redux/actions";
import axios from "axios";

import Alert from "../../components/Alert/Alarm.jsx";
import "./NewClassForm.scss";

const mapStateToProps = (state) => {
  return {
    pageData: state.PageReducer.pageData,
    CurrentClass: state.ClassReducer.currentClass,
  };
};

const NewClassForm = ({ CurrentClass, Send_PageData, pageData }) => {
  const [weekState, setWeekState] = useState({ status: "Class" });
  const [submitted, setSubmitted] = useState(false);

  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [courses, setCourses] = useState(null);
  const history = useHistory();

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
  const [errors, setErrors] = useState({
    date: "",
    className: "",
    startTime: "",
    endTime: "",
    syllabusURL: "",
  });
  const get_Courses = useCallback(async () => {
    let allCourses = await axios.get(`/api/v1/courses/`);
    allCourses = allCourses.data.data.filter(
      (course) => course.cityName === pageData.city
    );
    // if (edit) {
    //   setValues({
    //     date: "",
    //     courseCalendar_Id: allCourses && allCourses[0]._id,
    //     status: "Class",
    //     className: "",
    //     startTime: "",
    //     endTime: "",
    //     syllabusURL: "",
    //     scheduleType: "Education Lead Class",
    //   });
    // }

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
  const createClass = (newClassData) => {
    axios
      .post(`/api/v1/classes`, {
        ...newClassData,
      })
      .then((response) => {
        if (response.data.success === true) {
          history.push("/coursecalendar/");
          setSubmitted(true);
          setErrors({
            date: "",
            className: "",
            startTime: "",
            endTime: "",
            syllabusURL: "",
          });
          setTimeout(() => {
            Send_PageData(pageData.user, "Course Calendar", pageData.city);
            history.push("/coursecalendar/");
          }, 2000);
        }
      })
      .catch((err) => {
        if (err.response.data.success === false) {
          setErrors({
            date: err.response.data.data.date,
            className: err.response.data.data.className,
            startTime: err.response.data.data.startTime,
            endTime: err.response.data.data.endTime,
            syllabusURL: err.response.data.data.syllabusURL,
          });
        }
      });
  };
  const updateClass = (classId, updatedData) => {
    axios
      .put(`/api/v1/classes/${classId}`, {
        ...updatedData,
      })
      .then((response) => {
        if (response.data.success === true) {
          setTimeout(() => {
            Send_PageData(pageData.user, "Course Calendar", pageData.city);
            history.push("/coursecalendar/");
          }, 2000);
          set_CurrentClass(values);
          setEdit(false);
          setUpdated(true);
        }
      })
      .catch((err) => {
        if (err.response.data.success === false) {
          setErrors({
            date: err.response.data.data.date,
            className: err.response.data.data.className,
            startTime: err.response.data.data.startTime,
            endTime: err.response.data.data.endTime,
            syllabusURL: err.response.data.data.syllabusURL,
          });
        }
      });
  };
  const handleSubmit = (e) => {
    values.status = weekState.status === "Class" ? true : false;
    if (edit) {
      e.preventDefault();
      if (!values.status) {
        values.startTime = null;
        values.scheduleType = null;
        values.syllabusURL = null;
        values.endTime = null;
      }
      updateClass(CurrentClass._id, values);
    } else {
      e.preventDefault();
      createClass(values);
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
        {submitted && Object.keys(errors).length !== 0 && (
          <Alert
            type={"danger"}
            children={"Please, correct the errors displayed, Thanks!"}
          />
        )}
        {submitted && Object.keys(errors).length === 0 && (
          <Alert type={"success"} children={"New class successfully added!"} />
        )}
        {updated && Object.keys(errors).length !== 0 && (
          <Alert type={"danger"} children={errors.message} />
        )}
        {updated && Object.keys(errors).length === 0 && (
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
            className={
              errors.date ? "form-control error-animation" : "form-control"
            }
            value={values.date}
            onChange={handleChange}
          />
        </div>
        <div className="err-msg">{errors.date && <p> {errors.date}</p>}</div>

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
                className={
                  errors.className
                    ? "form-control error-animation"
                    : "form-control"
                }
                type="text"
                placeholder="Class Name"
                value={values.className}
                onChange={handleChange}
              />
            </div>
            <div className="err-msg">
              {errors.className && <p>{errors.className}</p>}
            </div>

            <div className="form-group font-size">
              <label htmlFor="startTime">Start Time:</label>
              <input
                name="startTime"
                className={
                  errors.startTime
                    ? "form-control error-animation"
                    : "form-control"
                }
                type="time"
                value={values.startTime}
                onChange={handleChange}
              />
            </div>
            <div className="err-msg">
              {errors.startTime && <p>{errors.startTime}</p>}
            </div>

            <div className="form-group font-size">
              <label htmlFor="endTime">End Time:</label>
              <input
                name="endTime"
                className={
                  errors.endTime
                    ? "form-control error-animation"
                    : "form-control"
                }
                type="time"
                value={values.endTime}
                onChange={handleChange}
              />
            </div>
            <div className="err-msg">
              {errors.endTime && <p>{errors.endTime}</p>}
            </div>

            <div className="form-group font-size">
              <label htmlFor="syllabusURL">Syllabus URL:</label>
              <input
                name="syllabusURL"
                className={
                  errors.date ? "form-control error-animation" : "form-control"
                }
                type="text"
                placeholder="Syllabus URL"
                value={values.syllabusURL}
                onChange={handleChange}
              />
            </div>
            <div className="err-msg">
              {errors.syllabusURL && <p>{errors.syllabusURL}</p>}
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
            />
          </div>
        )}

        <div className="form-group font-size">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, {
  Send_PageData,
})(NewClassForm);
