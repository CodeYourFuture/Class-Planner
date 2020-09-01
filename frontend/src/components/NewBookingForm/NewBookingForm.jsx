import React, { useState } from "react";
import { connect } from "react-redux";
import { createBooking } from "../../redux/actions";
import { useForm } from "react-hook-form";
import "./NewBookingForm.scss";
import rolesData from "./../../data/roles.json";
import Alert from "../../components/Alert/Alarm.jsx";
import dayjs from "dayjs";

const mapStateToProps = (state) => {
  return {
    CurrentClass: state.ClassReducer.currentClass,
    getErrors: state.getErrors,
  };
};

const NewBookingForm = ({
  bookings,
  getErrors,
  createBooking,
  CurrentClass,
}) => {
  const { register, handleSubmit, errors } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data, e) => {
    data.classId = CurrentClass._id;
    data.bookingDate = dayjs(new Date()).format("MM/DD/YYYY");
    data.bookingTime = dayjs(new Date()).format("h:mm");

    createBooking(data);
    setSubmitted(true);

    e.target.reset();
  };
  return (
    <div className="newbooking-container">
      <form className="newbooking-form" onSubmit={handleSubmit(onSubmit)}>
        {submitted && Object.keys(getErrors).length !== 0 && (
          <Alert type={"danger"} children={getErrors.email} />
        )}
        {submitted && Object.keys(getErrors).length === 0 && (
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
        {/* {bookings.data ? <p>{bookings.data[0]._id} </p> : null} */}
        <div className="form-group">
          <input type="submit" onClick={handleSubmit}></input>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, { createBooking })(NewBookingForm);
