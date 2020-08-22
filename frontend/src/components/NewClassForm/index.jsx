import React, { useState } from "react";
import { connect } from "react-redux";
import { createClass } from "../../redux/actions";
import "./NewClassForm.scss";

const mapStateToProps = (state) => {
  return { classes: state.ClassReducer.classes };
};

const NewClassForm = ({ classes, createClass }) => {
  // const [showMessage, setShowMessage] = useState("");
  const [weekState, setWeekState] = useState("Class");
  const [values, setValues] = useState({
    date: "",
    status: "true",
    className: "",
    startTime: "",
    endTime: "",
    scheduleType: "",
    syllabusURL: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    createClass(values);
  };
  return (
    <div className="NewClass_Body">
      <p className="NewClass_Title"> New Class</p>
      <div className="NewClass_Main">
        <div id="Message"></div>
        <table className="NewClass_Table">
          <tbody>
            <tr>
              <td>Date:</td>
              <td>
                <input
                  id="Date"
                  name="date"
                  type="Date"
                  className="NewClass_Input_Date"
                  value={values.date}
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
            <tr>
              <td>Status:</td>
              <td className="NewClass_Status">
                <p
                  className={
                    weekState === "Class"
                      ? "NewClass_Status_Active NewClass_Status_Class"
                      : "NewClass_Status_Class"
                  }
                  onClick={() => {
                    setWeekState("Class");
                  }}
                >
                  Class
                </p>
                <p
                  className={
                    weekState === "Holiday"
                      ? "NewClass_Status_Active NewClass_Status_Holiday"
                      : "NewClass_Status_Holiday"
                  }
                  onClick={() => {
                    setWeekState("Holiday");
                  }}
                >
                  Holiday
                </p>
              </td>
            </tr>
            {weekState === "Class" ? (
              <>
                <tr>
                  <td>Class Name:</td>
                  <td>
                    <input
                      id="ClassName"
                      name="className"
                      value={values.className}
                      onChange={handleChange}
                      type="text"
                      placeholder="Class Name"
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>Start Time:</td>
                  <td>
                    <input
                      id="StartTime"
                      name="startTime"
                      value={values.startTime}
                      onChange={handleChange}
                      type="time"
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>End Time:</td>
                  <td>
                    <input
                      id="EndTime"
                      name="endTime"
                      value={values.endTime}
                      onChange={handleChange}
                      type="time"
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>Schedule:</td>
                  <td>
                    <input
                      id="Schedule"
                      name="scheduleType"
                      value={values.scheduleType}
                      onChange={handleChange}
                      type="text"
                      placeholder="Schedule"
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>Syllabus URL:</td>
                  <td>
                    <input
                      id="Syllabus"
                      name="syllabusURL"
                      value={values.syllabusURL}
                      onChange={handleChange}
                      className="Syllabus"
                      type="text"
                      placeholder="https:// . . ."
                    ></input>
                  </td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td>Reason:</td>
                  <td>
                    <input
                      id="Reason"
                      name="scheduleType"
                      value={values.scheduleType}
                      onChange={handleChange}
                      type="text"
                      placeholder="Reason"
                    ></input>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <div className="NewClass_CreateButton_Div">
          <button type="submit" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, { createClass })(NewClassForm);
