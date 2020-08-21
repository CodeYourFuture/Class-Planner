import React from "react";
import { Link } from "react-router-dom";
import "./NewBookingForm.scss";

const NewBookingForm = () => {
  return (
    <div className="newbooking-container">
      <form method="post">
        <label for="fullName">Full name:</label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          className="form-control margin-bottom-20"
        />
        <label for="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          className="form-control margin-bottom-20"
        />
        <label for="role">Role:</label>
        <select id="role">
          <option value="0">Select your preferred role</option>
          <option value="1">Coordinator</option>
          <option value="2">Lead Teacher</option>
          <option value="3">Assistant Lead Teacher</option>
          <option value="4">Teaching Assistant</option>
          <option value="5">Personal Development Rep</option>
        </select>
      </form>
    </div>
  );
};

export default NewBookingForm;
