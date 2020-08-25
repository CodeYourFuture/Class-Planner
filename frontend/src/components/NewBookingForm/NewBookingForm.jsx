import React from "react";
import "./NewBookingForm.scss";

const NewBookingForm = () => {
  return (
    <div className="newbooking-container">
      <form method="post" className="newbooking-form">
        <div className="form-group">
          <label htmlFor="fullName">Full name:</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select id="role" className="form-control">
            <option value="0">Select your preferred role</option>
            <option value="1">Coordinator</option>
            <option value="2">Lead Teacher</option>
            <option value="3">Assistant Lead Teacher</option>
            <option value="4">Teaching Assistant</option>
            <option value="5">Personal Development Rep</option>
          </select>
        </div>

        <div className="form-group">
          <input type="submit"></input>
        </div>
      </form>
    </div>
  );
};

export default NewBookingForm;
