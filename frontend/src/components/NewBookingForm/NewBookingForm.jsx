import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./NewBookingForm.scss";
import rolesData from "./../../data/roles.json";
import Alert from "../../components/Alert/Alarm.jsx";
import dayjs from "dayjs";

const NewBookingForm = ({ Class }) => {
  const { register, handleSubmit, errors } = useForm();
  const [submitted, setSubmitted] = useState(false);
  // const [backendErrors, setBackendError] = useState();

  const onSubmit = async (data, e) => {
    data.classId = Class._id;
    data.bookingDate = dayjs(new Date()).format("MM/DD/YYYY");
    data.bookingTime = dayjs(new Date()).format("h:mm");
    await axios
      .post(`/api/v1/bookings`, {
        ...data,
      })
      // .catch((err) => {    
      //   setBackendError(err.response.data)
      // });

    setSubmitted(true);

    e.target.reset();
  };
  return (
    <div className="newbooking-container">
      <form className="newbooking-form" onSubmit={handleSubmit(onSubmit)}>
        {/* {submitted && Object.keys(backendErrors).length !== 0 && (
          <Alert type={"danger"} children={backendErrors.email} />
        )} */}
        {/* && Object.keys(backendErrors).length */}
        {submitted  === 0 && (
          <Alert
            type={"success"}
            children={" Thanks, You have been booked successfully!"}
          />
        )}
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            className={
              errors.fullName ? "form-control error-animation" : "form-control"
            }
            ref={register({ required: true })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            className={
              errors.email ? "form-control error-animation" : "form-control"
            }
            ref={register({
              required: true,
            })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>

          <select
            id="role"
            name="roleName"
            className="form-control"
            ref={register({ required: true })}
          >
            {rolesData.map((role) => (
              <option key={role.id} value={role.roleName}>
                {role.roleName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input type="submit" onClick={handleSubmit}></input>
        </div>
      </form>
    </div>
  );
};

export default NewBookingForm;
