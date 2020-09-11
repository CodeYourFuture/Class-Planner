import React, { useState } from "react";
// import dayjs from "dayjs";
import { useHistory } from "react-router";
import axios from "axios";

import Alert from "../../components/Alert/Alarm.jsx";
import "./NewClassForm.scss";

const NewClassForm = ({ user, city, component, courses }) => {
  const [weekState, setWeekState] = useState({ status: "Class" });
  const [submitted, setSubmitted] = useState(false);
  // const [edit, setEdit] = useState(false);
  // const [updated, setUpdated] = useState(false);
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
    courseCalendar_Id: "",
    syllabusURL: "",
    message: "",
  });
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
          setErrors({
            date: "",
            className: "",
            startTime: "",
            endTime: "",
            syllabusURL: "",
            courseCalendar_Id: "",
            message: "",
          });
          setTimeout(() => {
            history.push(`/${user}/${city}/coursecalendar/`);
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
            courseCalendar_Id: err.response.data.data.courseCalendar_Id,
          });
        }
      });
  };
  // const updateClass = (classId, updatedData) => {
  //   axios
  //     .put(`/api/v1/classes/${classId}`, {
  //       ...updatedData,
  //     })
  //     .then((response) => {
  //       if (response.data.success === true) {
  //         setTimeout(() => {            
  //           history.push(`/${user}/${city}/coursecalendar/`);
  //         }, 2000);
  //         set_CurrentClass(values);
  //         setEdit(false);
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.response.data.success === false) {
  //         setErrors({
  //           date: err.response.data.data.date,
  //           className: err.response.data.data.className,
  //           startTime: err.response.data.data.startTime,
  //           endTime: err.response.data.data.endTime,
  //           courseCalendar_Id: err.response.data.data.courseCalendar_Id,
  //           syllabusURL: err.response.data.data.syllabusURL,
  //           message: err.response.data.data.message,
  //         });
  //       }
  //     });
  // };
  const handleSubmit = (e) => {
    values.status = weekState.status === "Class" ? true : false;
    // if (edit) {
    //   e.preventDefault();
    //   // if (!values.status) {
    //   //   values.startTime = null;
    //   //   values.scheduleType = null;
    //   //   values.syllabusURL = null;
    //   //   values.endTime = null;
    //   // }
    //   // updateClass(CurrentClass._id, values);
    //   // setUpdated(true);
    // } else {
      e.preventDefault();
      createClass(values);
      setSubmitted(true);
    
    setWeekState({ status: "Class" });
  };
  // useEffect(() => {
  //   if (component === "editclass") {
  //     setValues({
  //       status: CurrentClass ? CurrentClass.status : null,
  //       date: CurrentClass
  //         ? dayjs(CurrentClass.date).format("YYYY-MM-DD")
  //         : null,
  //       startTime: CurrentClass ? CurrentClass.startTime : null,
  //       endTime: CurrentClass ? CurrentClass.endTime : null,
  //       className: CurrentClass ? CurrentClass.className : null,
  //       scheduleType: CurrentClass ? CurrentClass.scheduleType : null,
  //       syllabusURL: CurrentClass ? CurrentClass.syllabusURL : null,
  //       courseCalendar_Id: CurrentClass ? CurrentClass.courseCalendar_Id : null,
  //     });
  //     setEdit(true);
  //   }
  // }, [component, CurrentClass]);
  return (
    <div className="new-class-container">
      <div className="upcoming-class-title">
        <p>{city}</p> <i className="fas fa-chevron-right"></i>
        <p>New Class</p>
      </div>
      <form className="new-class-form" onSubmit={handleSubmit}>
        {/* {submitted && Object.keys(errors).length !== 0 && (
          <Alert
            type={"danger"}
            children={"Please, correct the errors displayed, Thanks!"}
          />
        )} */}
        {submitted && Object.keys(errors).length === 0 && (
          <Alert type={"success"} children={"New class successfully added!"} />
        )}
        {/* {Object.keys(errors).length !== 0 && (
          <Alert
            type={"danger"}
            children={
              errors.message
                ? errors.message
                : "Please, correct the errors displayed, Thanks!"
            }
          />
        )} */}
        {Object.keys(errors).length === 0 && (
          <Alert
            type={"success"}
            children={"New class successfully updated!"}
          />
        )}
        <div className="form-group font-size">
          <label>Intake: </label>
          <select
            name="courseCalendar_Id"
            className={
              errors.courseCalendar_Id
                ? "form-control error-animation"
                : "form-control"
            }
            value={values.courseCalendar_Id}
            onChange={handleChange}
          >
            <option>Select here</option>
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
        <div className="err-msg">
          {errors.courseCalendar_Id && <p> {errors.courseCalendar_Id}</p>}
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
                  errors.syllabusURL
                    ? "form-control error-animation"
                    : "form-control"
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
          <>
            <div className="form-group font-size">
              <label htmlFor="ClassName">Reason:</label>
              <input
                name="className"
                className={
                  errors.className
                    ? "form-control error-animation"
                    : "form-control"
                }
                type="text"
                placeholder="Reason . . ."
                value={values.className}
                onChange={handleChange}
              />
            </div>
            <div className="err-msg">
              {errors.className && <p>{errors.className}</p>}
            </div>
          </>
        )}

        <div className="form-group font-size">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default NewClassForm;
