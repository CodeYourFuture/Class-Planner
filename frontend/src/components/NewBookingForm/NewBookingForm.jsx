import React from "react";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { createBooking } from "../../redux/actions";
import { useForm } from "react-hook-form";
import "./NewBookingForm.scss";
import rolesData from "./../../data/roles.json";

const mapStateToProps = (state) => {
  return {
    bookings: state.BookingReducer.booking,
  };
};

const NewBookingForm = ({ bookings, createBooking, Class }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data, e) => {
    data.classId = Class._id;
    data.bookingDate = dayjs(new Date()).format("MM/DD/YYYY");
    data.bookingTime = dayjs(new Date()).format("h:mm");

    createBooking(data);

    e.target.reset();
  };
  return (
    <div className="newbooking-container">
      <form
        method="post"
        className="newbooking-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-group">
          <label htmlFor="fullName">Full name:</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            className="form-control"
            ref={register({ required: true })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
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
            ref={register()}
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
