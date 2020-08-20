import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = ({ parm, NavState }) => {
  return (
    <div className="header">
      <div className="header-firtchild">
        <Link className="home-link header-logo" to="/">
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
      <div className="header-secondchild">
        <Link
          className={
            NavState === "upcoming class"
              ? "header-nav header-selected"
              : "header-nav"
          }
          to="/upcomingclass/admin"
        >
          <i className="far fa-calendar-check"></i>
          <p>Upcoming Class</p>
        </Link>
        <Link
          className={
            NavState === "course calendar"
              ? "header-nav header-selected"
              : "header-nav"
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
                ? "header-nav header-selected"
                : "header-nav"
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
