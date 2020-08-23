import React, { useState } from "react";
import { connect } from "react-redux";
import { createClass } from "../../redux/actions";
// import useForm from "react-hook-form";
import "./NewClassForm.scss";

const mapStateToProps = (state) => {
  return { classes: state.ClassReducer.classes };
};

const NewClassForm = ({ classes, createClass }) => {
  // const [showMessage, setShowMessage] = useState("");
  // const [weekState, setWeekState] = useState("Class");
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
    console.log(values);
    createClass(values);
  };
  return (
    <div className="new-class-container">
      <p className="new-class-title">New Class</p>
      <form className="new-class-form">
        <div id="Message"></div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="Date"
            className="new-class-input"
            value={values.date}
            onChange={handleChange}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="Date">Status:</label>
          <input type="radio" name="classstatus" checked="true" vlaue="Class" />
          <input type="radio" name="classstatus" value="Holiday" />
        </div>

        <div className="form-group">
          <label htmlFor="ClassName">Class Name:</label>
          <input
            id="ClassName"
            name="className"
            value={values.className}
            onChange={handleChange}
            type="text"
            placeholder="Class Name"
          ></input>
        </div>

        <div className="form-group">
          <label>Start Time:</label>
          <input
            id="StartTime"
            name="startTime"
            value={values.startTime}
            onChange={handleChange}
            type="time"
          ></input>
        </div>

        <div className="form-group">
          <label>End Time:</label>
          <input
            id="endtime"
            name="endtime"
            value={values.endtime}
            onChange={handleChange}
            type="time"
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="schedule"
            className="form-control"
            value={values.scheduleType}
            onChange={handleChange}
            placeholder="Schedule"
          >
            <option value="0">Education Lead Class</option>
            <option value="1">Personal Development Team Lead Class</option>
          </select>
        </div>

        <div className="NewClass_CreateButton_Div">
          <button type="submit" onClick={handleSubmit}>
            Save
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default connect(mapStateToProps, { createClass })(NewClassForm);


// <table className="NewClass_Table">
//           <tbody>
//             <tr>
//               <td>Date:</td>
//               <td>
//                 <input
//                   id="Date"
//                   name="date"
//                   type="Date"
//                   className="NewClass_Input_Date"
//                   value={values.date}
//                   onChange={handleChange}
//                 ></input>
//               </td>
//             </tr>
//             <tr>
//               <td>Status:</td>
//               <td className="NewClass_Status">
//                 <p
//                   className={
//                     weekState === "Class"
//                       ? "NewClass_Status_Active NewClass_Status_Class"
//                       : "NewClass_Status_Class"
//                   }
//                   onClick={() => {
//                     setWeekState("Class");
//                   }}
//                 >
//                   Class
//                 </p>
//                 <p
//                   className={
//                     weekState === "Holiday"
//                       ? "NewClass_Status_Active NewClass_Status_Holiday"
//                       : "NewClass_Status_Holiday"
//                   }
//                   onClick={() => {
//                     setWeekState("Holiday");
//                   }}
//                 >
//                   Holiday
//                 </p>
//               </td>
//             </tr>
//             {weekState === "Class" ? (
//               <>
//                 <tr>
//                   <td>Class Name:</td>
//                   <td>
//                     <input
//                       id="ClassName"
//                       name="className"
//                       value={values.className}
//                       onChange={handleChange}
//                       type="text"
//                       placeholder="Class Name"
//                     ></input>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>Start Time:</td>
//                   <td>
//                     <input
//                       id="StartTime"
//                       name="startTime"
//                       value={values.startTime}
//                       onChange={handleChange}
//                       type="time"
//                     ></input>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>End Time:</td>
//                   <td>
//                     <input
//                       id="EndTime"
//                       name="endTime"
//                       value={values.endTime}
//                       onChange={handleChange}
//                       type="time"
//                     ></input>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>Schedule:</td>
//                   <td>
//                     <input
//                       id="Schedule"
//                       name="scheduleType"
//                       value={values.scheduleType}
//                       onChange={handleChange}
//                       type="text"
//                       placeholder="Schedule"
//                     ></input>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>Syllabus URL:</td>
//                   <td>
//                     <input
//                       id="Syllabus"
//                       name="syllabusURL"
//                       value={values.syllabusURL}
//                       onChange={handleChange}
//                       className="Syllabus"
//                       type="text"
//                       placeholder="https:// . . ."
//                     ></input>
//                   </td>
//                 </tr>
//               </>
//             ) : (
//               <>
//                 <tr>
//                   <td>Reason:</td>
//                   <td>
//                     <input
//                       id="Reason"
//                       name="scheduleType"
//                       value={values.scheduleType}
//                       onChange={handleChange}
//                       type="text"
//                       placeholder="Reason"
//                     ></input>
//                   </td>
//                 </tr>
//               </>
//             )}
//           </tbody>
//         </table>
//         <div className="NewClass_CreateButton_Div">
//           <button type="submit" onClick={handleSubmit}>
//             Save
//           </button>
//         </div>