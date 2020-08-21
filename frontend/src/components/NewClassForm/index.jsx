import React, { useState } from "react";
import "./NewClassForm.scss";

const NewClassForm = ({ parm }) => {
  const [weekState, setWeekState] = useState("Class");

  return (
    <div className="NewClass_Body">
      <p className="NewClass_Title"> New Class</p>
      <div className="NewClass_Main">
        <div id="Message"></div>
        <table className="NewClass_Table">
          <tbody>
            <tr>
              <td>Data:</td>
              <td>
                <input
                  id="Date"
                  type="Date"
                  className="NewClass_Input_Date"
                  onChange={(e) => (e.target.style.animation = "none")}
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
                      type="text"
                      placeholder="Class Name"
                      onChange={(e) => (e.target.style.animation = "none")}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>Start Time:</td>
                  <td>
                    <input
                      id="StartTime"
                      type="time"
                      onChange={(e) => (e.target.style.animation = "none")}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>End Time:</td>
                  <td>
                    <input
                      id="EndTime"
                      type="time"
                      onChange={(e) => (e.target.style.animation = "none")}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>Schedule:</td>
                  <td>
                    <input
                      id="Schedule"
                      type="text"
                      placeholder="Schedule"
                      onChange={(e) => (e.target.style.animation = "none")}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>Syllabus URL:</td>
                  <td>
                    <input
                      id="Syllabus"
                      className="Syllabus"
                      type="text"
                      placeholder="https:// . . ."
                      onChange={(e) => (e.target.style.animation = "none")}
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
                      type="text"
                      placeholder="Reason"
                      onChange={(e) => (e.target.style.animation = "none")}
                    ></input>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <div className="NewClass_CreateButton_Div">
          <p>Create</p>
        </div>
      </div>
    </div>
  );
};

export default NewClassForm;
