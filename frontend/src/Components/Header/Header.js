import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = ({ parm, NavState }) => {
  return (
    <div className="Header">
      <div className="Header_FirtChild">
        <Link className="Home_Link Header_Logo" to="/">
          <div>
            <p> &lt;</p>
            <p>CODE</p>
            <p>&gt;&nbsp;</p>
            <br />
            <p>YOUR</p>
          </div>
          <p>FUTURE</p>
        </Link>
      </div>
      <div className="Header_SecondChild">
        <Link
          className={
            NavState === "upcoming class"
              ? "Header_Nav Header_Selected"
              : "Header_Nav"
          }
          to="/upcomingclass/admin"
        >
          <i className="far fa-calendar-check"></i>
          <p>Upcoming Class</p>
        </Link>
        <Link
          className={
            NavState === "course calendar"
              ? "Header_Nav Header_Selected"
              : "Header_Nav"
          }
          to="/"
        >
          <i className="far fa-calendar-alt"></i>
          <p>Course Calendar</p>
        </Link>
        {parm.user === "admin" ? (
          <Link
            className={
              NavState === "new class"
                ? "Header_Nav Header_Selected"
                : "Header_Nav"
            }
            to="/"
          >
            <i className="far fa-calendar-plus"></i>
            <p>New Class</p>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
