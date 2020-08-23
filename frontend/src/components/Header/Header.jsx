import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = ({ param, NavState }) => {
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
            NavState === "courseCalendar"
              ? "header-nav header-selected"
              : "header-nav"
          }
          to={
            param.user === "admin"
              ? "/upcomingclass/admin"
              : param.user === "volunteer"
              ? "/upcomingclass/volunteer"
              : "/upcomingclass/student"
          }
        >
          <i className="far fa-calendar-alt"></i>
          <p>Course Calendar</p>
        </Link>
        <Link
          className={
            NavState === "upcomingClass"
              ? "header-nav header-selected"
              : "header-nav"
          }
          to={
            param.user === "admin"
              ? "/upcomingclass/admin"
              : param.user === "volunteer"
              ? "/upcomingclass/volunteer"
              : "/upcomingclass/student"
          }
        >
          <i className="far fa-calendar-check"></i>
          <p>Upcoming Class</p>
        </Link>
        {param.user === "admin" ? (
          <Link
            className={
              NavState === "newClass"
                ? "header-nav header-selected"
                : "header-nav"
            }
            to="/newclass/admin"
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
